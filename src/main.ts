import * as toolGo from './tool.go.js'
import * as toolNode from './tool.node.js'
import * as toolTerraform from './tool.terraform.js'
import * as core from '@actions/core'
import * as artifactory from './helpers/artifactory.js'
import getInputs from './helpers/getInputs.js'
import { z } from 'zod'
import catchZodError from './helpers/catchZodError.js'
import { Octokit } from '@octokit/rest'

const tools = [toolGo, toolNode, toolTerraform]

export const run = async () => {
  let encounteredNonFatalError = false

  // Load Inputs
  // ============================================================================

  const InputsSchema = z.object({
    'artifactory-username': z.string().nonempty(),
    'artifactory-password': z.string().nonempty(),
    'artifactory-base-url-for-tools': z.string().nonempty(),
    'github-token': z.string().nonempty(),
    'dry-run': z.string().transform((x) => x.toUpperCase() === 'TRUE'),
  })

  let inputs = catchZodError(
    () => getInputs(InputsSchema),
    (errorSummary) => {
      core.error(`Could not parse inputs:\n${errorSummary}`)
      process.exit(1)
    }
  )

  const octokit = new Octokit({
    auth: inputs['github-token'],
  })

  const artifactoryInputs = {
    username: inputs['artifactory-username'],
    password: inputs['artifactory-password'],
    baseURLForTools: inputs['artifactory-base-url-for-tools'],
  }

  // Plan Imports
  // ============================================================================

  let enqueuedFilesToImports: Record<string, string> = {}

  for (const tool of tools) {
    console.log(`Checking files to import for ${tool.toolName}:`)

    let filesToImport
    try {
      filesToImport = await tool.getFilesToImport({ octokit })
    } catch (error) {
      core.error(`Determining the files to import for "${tool.toolName} failed:"\n${String(error)}`)
      encounteredNonFatalError = true
      continue
    }

    let skippedFilesToImport = 0
    for (const [file, downloadURL] of Object.entries(filesToImport)) {
      try {
        if (await artifactory.fileExists(artifactoryInputs, file)) {
          skippedFilesToImport++
          continue
        }

        console.log(`- Import required: "${downloadURL}" -> "${file}"`)
        enqueuedFilesToImports[file] = downloadURL
      } catch (error) {
        core.error(`Checking whether "${file}" exists in Artifactory failed:\n${String(error)}`)
        encounteredNonFatalError = true
        continue
      }
    }
    console.log(`- ${skippedFilesToImport} files were already in Artifactory`)
    console.log('')
  }

  // Import
  // ============================================================================

  if (inputs['dry-run']) {
    console.log('Skipping import because dry-run was enabled')
  } else {
    console.log(`Beginning import of ${Object.keys(enqueuedFilesToImports).length} tools...`)

    for (const [file, downloadURL] of Object.entries(enqueuedFilesToImports)) {
      try {
        console.log(`"${downloadURL}" -> "${file}"`)
        await artifactory.upload(artifactoryInputs, file, downloadURL)
      } catch (error) {
        core.error(`Import of "${file}" into Artifactory failed:\n${String(error)}`)
        encounteredNonFatalError = true
        continue
      }
    }

    console.log('Import completed.')
  }

  // Finalize
  // ============================================================================

  if (encounteredNonFatalError) core.setFailed('One or more errors occurred. Please review the log output.')
}

import { pipeline as streamPipeline } from 'node:stream/promises'
import fs from 'node:fs'
import path from 'node:path'
import got from 'got'

type artifactoryInputs = {
  username: string
  password: string
  baseURLForTools: string
}

export const fileExists = async (_: artifactoryInputs, file: string): Promise<boolean> => {
  // TODO: Implement that this looks in Artifactory

  try {
    await fs.promises.access(`fake-artifactory-folder/${file}`)
    return true
  } catch {
    return false
  }
}

export const upload = async (_: artifactoryInputs, file: string, downloadURL: string) => {
  // TODO: Implement that this uploads the file from the internet into artifactory
  // - Use streaming so that download and upload happen in parallel
  // - https://github.com/sindresorhus/got/blob/main/documentation/3-streams.md

  const fullPath = `fake-artifactory-folder/${file}`
  await fs.promises.mkdir(path.dirname(fullPath), { recursive: true })
  await streamPipeline(got.stream(downloadURL), fs.createWriteStream(fullPath))
}

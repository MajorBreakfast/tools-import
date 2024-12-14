import { Octokit } from '@octokit/rest'
import listTagsOnGitHub from './helpers/listTagsOnGitHub.js'
import semver from 'semver'
import { getOctkit } from './testutils.js'

export const toolName = 'Go'

const getGoVersionsToImport = async (octokit: Octokit) => {
  const tags = await listTagsOnGitHub(octokit, 'golang/go')

  return tags
    .filter((tag) => tag.startsWith('go'))
    .map((tag) => tag.replace(/^go/, ''))
    .filter((v) => semver.satisfies(v, '>=1.23.4 || ~1.22.10'))
}

export const getFilesToImport = async ({ octokit }: { octokit: Octokit }): Promise<Record<string, string>> => {
  const filesToImport: Record<string, string> = {}
  for (const version of await getGoVersionsToImport(octokit)) {
    const url = `https://golang.org/dl/go${version}.linux-amd64.tar.gz`
    filesToImport[`go/${version}/linux-x64.tar.xz`] = url
  }
  return filesToImport
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('should list the expected files', async () => {
    expect(await getFilesToImport({ octokit: getOctkit() })).toEqual(
      expect.objectContaining({
        'go/1.23.4/linux-x64.tar.xz': 'https://golang.org/dl/go1.23.4.linux-amd64.tar.gz',
        'go/1.22.10/linux-x64.tar.xz': 'https://golang.org/dl/go1.22.10.linux-amd64.tar.gz',
      })
    )
  })
}

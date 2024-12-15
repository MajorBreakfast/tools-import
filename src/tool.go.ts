import { Octokit } from '@octokit/rest'
import listTagsOnGitHub from './helpers/listTagsOnGitHub.js'
import semver from 'semver'
import { getOctkit } from './testutils.js'

export const toolName = 'Go'

const cleanGitTag = (tag: string): string => {
  const [, major = '0', minor = '0', patch = '0', preRelease = ''] =
    tag.replace(/^go/, '').match(/^(\d+)(?:\.(\d+)(?:\.(\d+))?)?(.*)?$/) || []
  return `${major}.${minor}.${patch}${preRelease ? `-${preRelease.trim()}` : ''}`
}

export const getFilesToImport = async ({ octokit }: { octokit: Octokit }): Promise<Record<string, string>> => {
  const filesToImport: Record<string, string> = {}
  for (const tag of await listTagsOnGitHub(octokit, 'golang/go')) {
    if (!tag.startsWith('go')) continue

    const version = cleanGitTag(tag) // go1.21.0 -> 1.21.0, go1.20 -> 1.20.0
    if (!semver.satisfies(version, '>=1.23.4 || ~1.22.10')) continue

    const url = `https://golang.org/dl/${tag}.linux-amd64.tar.gz` // Using tag var here is on purpose
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

  it('should clean the git tags', () => {
    expect(cleanGitTag('go1')).toEqual('1.0.0')
    expect(cleanGitTag('go1.0.1')).toEqual('1.0.1')
    expect(cleanGitTag('go1.17')).toEqual('1.17.0')
    expect(cleanGitTag('go1.1rc2')).toEqual('1.1.0-rc2')
  })
}

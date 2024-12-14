import { z } from 'zod'
import semver from 'semver'

export const toolName = 'Node'

const getNodeVersionsToImport = async () => {
  const versionsJSON = z
    .array(z.object({ version: z.string() }))
    .parse(await fetch('https://nodejs.org/dist/index.json').then((res) => res.json()))

  return versionsJSON
    .map((x) => x.version.replace(/^v/, ''))
    .filter((v) => semver.satisfies(v, '>=23.4.0 || ^22.12.0 || ^20.18.1'))
}

export const getFilesToImport = async (): Promise<Record<string, string>> => {
  const filesToImport: Record<string, string> = {}
  for (const version of await getNodeVersionsToImport()) {
    const url = `https://nodejs.org/dist/v${version}/node-v${version}-linux-x64.tar.xz`
    filesToImport[`node/${version}/linux-x64.tar.xz`] = url
  }
  return filesToImport
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('should list the expected files', async () => {
    expect(await getFilesToImport()).toEqual(
      expect.objectContaining({
        'node/20.18.1/linux-x64.tar.xz': 'https://nodejs.org/dist/v20.18.1/node-v20.18.1-linux-x64.tar.xz',
        'node/22.12.0/linux-x64.tar.xz': 'https://nodejs.org/dist/v22.12.0/node-v22.12.0-linux-x64.tar.xz',
        'node/23.4.0/linux-x64.tar.xz': 'https://nodejs.org/dist/v23.4.0/node-v23.4.0-linux-x64.tar.xz',
      })
    )
  })
}

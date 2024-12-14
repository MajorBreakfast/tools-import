import { z } from 'zod'
import semver from 'semver'

export const toolName = 'Terraform'

const getTerraformVersionsToImport = async () => {
  const versionsJSON = z
    .object({ versions: z.record(z.object({})) })
    .parse(await fetch('https://releases.hashicorp.com/terraform/index.json').then((res) => res.json()))

  return Object.keys(versionsJSON.versions).filter((v) => semver.satisfies(v, '>=1.10.2 || ~1.9.8'))
}

export const getFilesToImport = async (): Promise<Record<string, string>> => {
  const filesToImport: Record<string, string> = {}
  for (const version of await getTerraformVersionsToImport()) {
    const url = `https://releases.hashicorp.com/terraform/${version}/terraform_${version}_linux_amd64.zip`
    filesToImport[`terraform/${version}/linux_amd64.zip`] = url
  }
  return filesToImport
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it('should list the expected files', async () => {
    expect(await getFilesToImport()).toEqual(
      expect.objectContaining({
        'terraform/1.10.2/linux_amd64.zip':
          'https://releases.hashicorp.com/terraform/1.10.2/terraform_1.10.2_linux_amd64.zip',
        'terraform/1.9.8/linux_amd64.zip':
          'https://releases.hashicorp.com/terraform/1.9.8/terraform_1.9.8_linux_amd64.zip',
      })
    )
  })
}

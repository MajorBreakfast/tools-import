import { Octokit } from '@octokit/rest'

type Options = {
  perPage?: number
  maxPages?: number
}
export default async function listTagsOnGitHub(
  octokit: Octokit,
  repository: string,
  options: Options = {}
): Promise<string[]> {
  const { perPage = 100, maxPages = 5 } = options

  const tags = []
  let page = 1

  while (true) {
    if (page > maxPages) break

    const response = await octokit.rest.repos.listTags({
      owner: repository.split('/')[0],
      repo: repository.split('/')[1],
      per_page: perPage,
      page,
    })

    if (response.data.length === 0) {
      break // No more tags to fetch
    }

    tags.push(...response.data.map((x) => x.name))
    page++ // Move to the next page
  }

  return tags
}

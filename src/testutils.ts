import { Octokit } from '@octokit/rest'

export const getOctkit = () => new Octokit({ auth: process.env['INPUT_github-token'] })

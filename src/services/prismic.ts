import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'

export const endpoint = process.env.PRISMIC_ENDPOINT;
export const repositoryName = prismic.getRepositoryName(endpoint)

// This factory function allows smooth preview setup
export function createClient(config = {}) {
  const client = prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  })

  // enableAutoPreviews({
  //   client,
  // })

  return client
}
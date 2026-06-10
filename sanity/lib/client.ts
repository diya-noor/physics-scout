import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: '262rmtge',
  dataset: 'production',
  apiVersion: '2026-05-15',
  useCdn: true,
})

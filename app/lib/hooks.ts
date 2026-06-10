import { useQuery } from '@tanstack/react-query'
import { client } from '@/sanity/lib/client'

const coursesQuery = `*[_type == "course"] | order(order asc) {
  _id, title, description, level, mode, youtubeUrl, isFree, fee,
  "pdfUrl": pdf.asset->url,
  "thumbnailUrl": thumbnail.asset->url,
  chapters[]->{ _id, title, order }
}`

const mcqsQuery = `*[_type == "mcq"] | order(publishedAt desc) {
  _id, question, options, correctAnswer, topic, difficulty, publishedAt
}`

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: () => client.fetch<any[]>(coursesQuery),
  })
}

export function useMCQs() {
  return useQuery({
    queryKey: ['mcqs'],
    queryFn: () => client.fetch<any[]>(mcqsQuery),
  })
}

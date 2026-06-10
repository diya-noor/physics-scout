import { getAllMCQs } from '@/sanity/lib/queries'
import MCQsClient from './MCQsClient'

export const revalidate = 60

export default async function MCQsPage() {
  const mcqs = await getAllMCQs() as any[]
  return <MCQsClient mcqs={mcqs} />
}

import { getCourses } from '@/sanity/lib/queries'
import CoursesClient from './CoursesClient'

export const revalidate = 60

export default async function CoursesPage() {
  const courses = await getCourses() as any[]
  return <CoursesClient courses={courses} />
}

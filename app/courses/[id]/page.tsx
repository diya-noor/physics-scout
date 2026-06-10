import { getCourseById, getChaptersByCourse } from '@/sanity/lib/queries'
import PortableText from '@/app/components/PortableText'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import Link from 'next/link'

export const revalidate = 60

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await getCourseById(params.id) as any
  const chapters = await getChaptersByCourse(params.id) as any[]

  if (!course) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 flex items-center justify-center" style={{ background: '#060810' }}>
          <div className="text-center">
            <div className="text-5xl mb-4">📚</div>
            <h1 className="font-display text-2xl font-bold text-text-primary mb-2">Course not found</h1>
            <Link href="/courses" className="text-gold underline underline-offset-2">Back to courses</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20" style={{ background: '#060810' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-16">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
            <Link href="/courses" className="hover:text-gold transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-text-secondary">{course.title}</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {course.level && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: 'rgba(33,150,243,0.12)', color: '#2196F3', border: '1px solid rgba(33,150,243,0.2)' }}>
                  {course.level}
                </span>
              )}
              {course.mode && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: 'rgba(245,168,0,0.1)', color: '#F5A800', border: '1px solid rgba(245,168,0,0.2)' }}>
                  {course.mode}
                </span>
              )}
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${course.isFree ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-gold/10 text-gold border border-gold/20'}`}>
                {course.isFree ? 'Free' : `PKR ${course.fee?.toLocaleString()}`}
              </span>
            </div>
            <h1 className="font-display text-4xl font-extrabold text-text-primary">{course.title}</h1>
            {course.description && (
              <p className="text-text-secondary mt-3 max-w-2xl leading-relaxed">{course.description}</p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            {course.pdfUrl && (
              <a href={course.pdfUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{ background: 'rgba(245,168,0,0.1)', color: '#F5A800', border: '1px solid rgba(245,168,0,0.25)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(245,168,0,0.2)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(245,168,0,0.1)' }}>
                ↓ Download Notes (PDF)
              </a>
            )}
            {course.youtubeUrl && (
              <a href={course.youtubeUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.25)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.2)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.1)' }}>
                ▶ Watch on YouTube
              </a>
            )}
          </div>

          {/* Rich text content */}
          {course.content && course.content.length > 0 && (
            <div className="mb-12 p-6 rounded-2xl"
              style={{ background: '#0D1117', border: '1px solid rgba(245,168,0,0.1)' }}>
              <PortableText value={course.content} />
            </div>
          )}

          {/* Chapters */}
          {chapters.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-extrabold text-text-primary mb-6">Chapters</h2>
              <div className="flex flex-col gap-3">
                {chapters.map((ch: any, i: number) => (
                  <Link key={ch._id} href={`/courses/${params.id}/chapter/${ch._id}`}
                    className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-200"
                    style={{ background: '#0D1117', border: '1px solid rgba(245,168,0,0.1)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,168,0,0.3)'; (e.currentTarget as HTMLElement).style.background = '#141A24' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,168,0,0.1)'; (e.currentTarget as HTMLElement).style.background = '#0D1117' }}>
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                      style={{ background: 'rgba(245,168,0,0.1)', color: '#F5A800' }}>
                      {ch.order ?? i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text-primary group-hover:text-gold transition-colors truncate">{ch.title}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {ch.pdfUrl && <span className="text-xs text-text-muted">PDF</span>}
                      {ch.youtubeUrl && <span className="text-xs text-text-muted">Video</span>}
                      <svg className="w-4 h-4 text-text-muted group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

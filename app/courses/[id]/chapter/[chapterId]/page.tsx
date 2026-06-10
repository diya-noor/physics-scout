import { getChapter, getMCQsByChapter } from '@/sanity/lib/queries'
import PortableText from '@/app/components/PortableText'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import Link from 'next/link'
import MCQCard from '@/app/components/MCQCard'

export const revalidate = 60

export default async function ChapterPage({ params }: { params: { id: string; chapterId: string } }) {
  const chapter = await getChapter(params.chapterId) as any
  const mcqs = await getMCQsByChapter(params.chapterId) as any[]

  if (!chapter) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 flex items-center justify-center" style={{ background: '#060810' }}>
          <div className="text-center">
            <div className="text-5xl mb-4">📖</div>
            <h1 className="font-display text-2xl font-bold text-text-primary mb-2">Chapter not found</h1>
            <Link href={`/courses/${params.id}`} className="text-gold underline underline-offset-2">Back to course</Link>
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
          <div className="flex items-center gap-2 text-sm text-text-muted mb-6 flex-wrap">
            <Link href="/courses" className="hover:text-gold transition-colors">Courses</Link>
            <span>/</span>
            {chapter.course && (
              <>
                <Link href={`/courses/${chapter.course._id}`} className="hover:text-gold transition-colors">
                  {chapter.course.title}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-text-secondary">{chapter.title}</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <p className="text-gold text-xs uppercase tracking-widest font-semibold mb-2">
              Chapter {chapter.order ?? '?'}
            </p>
            <h1 className="font-display text-4xl font-extrabold text-text-primary">{chapter.title}</h1>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            {chapter.pdfUrl && (
              <a href={chapter.pdfUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{ background: 'rgba(245,168,0,0.1)', color: '#F5A800', border: '1px solid rgba(245,168,0,0.25)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(245,168,0,0.2)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(245,168,0,0.1)' }}>
                ↓ Download Chapter PDF
              </a>
            )}
            {chapter.youtubeUrl && (
              <a href={chapter.youtubeUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
                style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.25)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.2)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.1)' }}>
                ▶ Watch Lecture
              </a>
            )}
          </div>

          {/* YouTube embed */}
          {chapter.youtubeUrl && (
            <div className="mb-8 rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <iframe
                src={chapter.youtubeUrl.replace('watch?v=', 'embed/').split('&')[0]}
                title={chapter.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Rich text content */}
          {chapter.content && chapter.content.length > 0 && (
            <div className="mb-12 p-6 rounded-2xl"
              style={{ background: '#0D1117', border: '1px solid rgba(245,168,0,0.1)' }}>
              <PortableText value={chapter.content} />
            </div>
          )}

          {/* Related MCQs */}
          {mcqs.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-extrabold text-text-primary mb-6">
                Practice MCQs ({mcqs.length})
              </h2>
              <div className="flex flex-col gap-5">
                {mcqs.map((mcq: any) => (
                  <MCQCard key={mcq._id} mcq={mcq} />
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

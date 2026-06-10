import { getQuiz } from '@/sanity/lib/queries'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import QuizView from '@/app/components/QuizView'
import Link from 'next/link'

export const revalidate = 60

export default async function QuizPage({ params }: { params: { id: string } }) {
  const quiz = await getQuiz(params.id) as any

  if (!quiz) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 flex items-center justify-center" style={{ background: '#060810' }}>
          <div className="text-center">
            <div className="text-5xl mb-4">📝</div>
            <h1 className="font-display text-2xl font-bold text-text-primary mb-2">Quiz not found</h1>
            <Link href="/mcqs" className="text-gold underline underline-offset-2">Browse MCQs</Link>
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
            <Link href="/mcqs" className="hover:text-gold transition-colors">MCQs</Link>
            <span>/</span>
            {quiz.chapter && (
              <>
                <Link href={`/courses/${quiz.course?._id}/chapter/${quiz.chapter._id}`}
                  className="hover:text-gold transition-colors">
                  {quiz.chapter.title}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-text-secondary">Quiz</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <p className="text-gold text-xs uppercase tracking-widest font-semibold mb-2">
              {quiz.course?.title || 'Quiz'} {quiz.chapter?.title ? `— ${quiz.chapter.title}` : ''}
            </p>
            <h1 className="font-display text-4xl font-extrabold text-text-primary">{quiz.title}</h1>
            {quiz.description && (
              <p className="text-text-secondary mt-2 max-w-xl leading-relaxed">{quiz.description}</p>
            )}
            <p className="text-text-muted text-sm mt-3">
              {quiz.questions?.length || 0} questions
            </p>
          </div>

          <QuizView
            questions={quiz.questions || []}
            title={quiz.title}
            description={quiz.description}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}

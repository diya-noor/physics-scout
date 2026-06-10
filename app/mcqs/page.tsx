'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MCQCard from '../components/MCQCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useMCQs } from '@/app/lib/hooks'

interface Score {
  attempted: number
  correct: number
  streak: number
}

const TOPICS = ['All', 'Mechanics', 'Thermodynamics', 'Electromagnetism', 'Waves & Optics', 'Modern Physics', 'Mathematical Physics']
const SCORE_KEY = 'ps_mcq_score'

export default function MCQsPage() {
  const { data: mcqs, isLoading: loading } = useMCQs()
  const [topic, setTopic] = useState('All')
  const [score, setScore] = useState<Score>({ attempted: 0, correct: 0, streak: 0 })
  const [answered, setAnswered] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const saved = localStorage.getItem(SCORE_KEY)
    if (saved) setScore(JSON.parse(saved))
  }, [])

  const handleAnswer = useCallback((id: string, correct: boolean) => {
    setAnswered(prev => ({ ...prev, [id]: true }))
    setScore(prev => {
      const next = {
        attempted: prev.attempted + 1,
        correct: prev.correct + (correct ? 1 : 0),
        streak: correct ? prev.streak + 1 : 0,
      }
      localStorage.setItem(SCORE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const today = (mcqs || [])[0]
  const archive = (mcqs || []).slice(1)
  const filtered = topic === 'All' ? archive : archive.filter(m => m.topic === topic)

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20" style={{ background: '#060810' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-16">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mb-10">
            <p className="text-gold text-xs uppercase tracking-widest font-semibold mb-2">Daily Practice</p>
            <h1 className="font-display text-4xl font-extrabold text-text-primary">MCQ Challenge</h1>
            <p className="text-text-secondary mt-2">Sharpen your physics skills with daily multiple-choice questions.</p>
          </motion.div>

          {/* Score tracker */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: 'Attempted', value: score.attempted },
              { label: 'Correct',   value: score.correct, color: '#22c55e' },
              { label: 'Streak',  value: score.streak,  color: '#F5A800' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-5 text-center"
                style={{ background: '#0D1117', border: '1px solid rgba(245,168,0,0.12)' }}>
                <div className="font-display text-3xl font-extrabold" style={{ color: s.color || '#E8EAF0' }}>{s.value}</div>
                <div className="text-text-muted text-xs uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Today's MCQ */}
          {loading ? (
            <div className="rounded-2xl p-10 text-center text-text-muted animate-pulse"
              style={{ background: '#0D1117', border: '1px solid rgba(245,168,0,0.1)' }}>
              Loading today&apos;s question...
            </div>
          ) : today ? (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12">
              <p className="text-gold text-xs uppercase tracking-widest font-semibold mb-3">Today&apos;s Question</p>
              <MCQCard mcq={today} onAnswer={c => !answered[today._id] && handleAnswer(today._id, c)} showDate />
            </motion.div>
          ) : (
            <div className="rounded-2xl p-10 text-center mb-12"
              style={{ background: '#0D1117', border: '1px solid rgba(245,168,0,0.12)' }}>
              <div className="text-4xl mb-3">🔬</div>
              <p className="text-text-muted text-sm">No MCQ published today. Check back soon!</p>
            </div>
          )}

          {/* Archive */}
          {archive.length > 0 && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <p className="text-gold text-xs uppercase tracking-widest font-semibold">Past Questions</p>
                {/* Topic filter */}
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map(t => (
                    <button key={t} onClick={() => setTopic(t)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200"
                      style={topic === t
                        ? { background: '#F5A800', color: '#000' }
                        : { background: 'rgba(255,255,255,0.04)', color: '#8B91A8', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <AnimatePresence mode="popLayout">
                  {filtered.map((mcq, i) => (
                    <motion.div key={mcq._id}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}>
                      <MCQCard mcq={mcq} onAnswer={c => !answered[mcq._id] && handleAnswer(mcq._id, c)} showDate />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {filtered.length === 0 && (
                  <p className="text-center text-text-muted py-10 text-sm">No questions found for this topic.</p>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

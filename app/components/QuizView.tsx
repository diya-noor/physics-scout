'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MCQ {
  _id: string
  question: string
  options: string[]
  correctAnswer: number
  difficulty?: string
  topic?: string
  explanation?: string
}

interface Props {
  questions: MCQ[]
  title: string
  description?: string
}

export default function QuizView({ questions, title, description }: Props) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)

  const q = questions[current]
  const selected = answers[q?._id] ?? -1
  const answered = selected >= 0

  const handleSelect = (idx: number) => {
    if (answered) return
    setAnswers(prev => ({ ...prev, [q._id]: idx }))
  }

  const goNext = () => {
    if (current < questions.length - 1) setCurrent(c => c + 1)
  }

  const goPrev = () => {
    if (current > 0) setCurrent(c => c - 1)
  }

  const totalAnswered = Object.keys(answers).length
  const correct = questions.filter(q => answers[q._id] === q.correctAnswer).length
  const allDone = totalAnswered === questions.length

  const getStyle = (i: number) => {
    if (answered) {
      if (i === q.correctAnswer) return {
        background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.5)', color: '#22c55e'
      }
      if (i === selected) return {
        background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.5)', color: '#ef4444'
      }
    }
    return {
      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,168,0,0.15)', color: '#A8ABBE'
    }
  }

  if (showResults) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
        <div className="rounded-2xl p-8 text-center"
          style={{ background: '#0D1117', border: '1px solid rgba(245,168,0,0.15)' }}>
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="font-display text-3xl font-extrabold text-text-primary mb-2">Quiz Complete!</h2>
          <p className="text-text-secondary mb-6">{title}</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Correct', value: correct, color: '#22c55e' },
              { label: 'Wrong', value: questions.length - correct, color: '#ef4444' },
              { label: 'Score', value: `${Math.round((correct / questions.length) * 100)}%`, color: '#F5A800' },
            ].map(s => (
              <div key={s.label} className="p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(245,168,0,0.1)' }}>
                <div className="font-display text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-text-muted text-xs uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <button onClick={() => { setShowResults(false); setCurrent(0); setAnswers({}) }}
            className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
            style={{ background: 'rgba(245,168,0,0.1)', color: '#F5A800', border: '1px solid rgba(245,168,0,0.25)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(245,168,0,0.2)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(245,168,0,0.1)' }}>
            Retry Quiz
          </button>
        </div>
        {/* Review */}
        <div className="mt-6 flex flex-col gap-3">
          {questions.map((mcq, i) => (
            <div key={mcq._id} className="p-4 rounded-xl"
              style={{ background: '#0D1117', border: '1px solid rgba(245,168,0,0.1)' }}>
              <p className="text-sm font-medium text-text-primary mb-2">{i + 1}. {mcq.question}</p>
              <p className="text-xs" style={{
                color: answers[mcq._id] === mcq.correctAnswer ? '#22c55e' : '#ef4444'
              }}>
                {answers[mcq._id] === mcq.correctAnswer ? '✓ Correct' : `✗ Wrong — Answer: ${String.fromCharCode(65 + mcq.correctAnswer)}`}
              </p>
              {mcq.explanation && (
                <p className="text-text-muted text-xs mt-1">{mcq.explanation}</p>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-text-muted text-sm">
          Question {current + 1} of {questions.length}
        </p>
        <p className="text-text-muted text-sm">
          {totalAnswered} answered
        </p>
      </div>
      <div className="w-full h-1 rounded-full mb-8" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full transition-all duration-300"
          style={{ width: `${(totalAnswered / questions.length) * 100}%`, background: '#F5A800' }} />
      </div>

      {!q ? (
        <div className="text-center py-12 text-text-muted">No questions in this quiz.</div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Question card */}
            <div className="rounded-2xl overflow-hidden mb-6"
              style={{ background: '#0D1117', border: '1px solid rgba(245,168,0,0.15)' }}>
              <div className="px-6 pt-5 pb-3 flex flex-wrap gap-2"
                style={{ borderBottom: '1px solid rgba(245,168,0,0.08)' }}>
                {q.topic && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: 'rgba(33,150,243,0.12)', color: '#2196F3', border: '1px solid rgba(33,150,243,0.2)' }}>
                    {q.topic}
                  </span>
                )}
                {q.difficulty && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: 'rgba(245,168,0,0.1)', color: '#F5A800', border: '1px solid rgba(245,168,0,0.2)' }}>
                    {q.difficulty}
                  </span>
                )}
              </div>
              <div className="px-6 py-5">
                <p className="text-text-primary font-medium text-base leading-relaxed">{q.question}</p>
              </div>
              <div className="px-6 pb-5 flex flex-col gap-3">
                {q.options.map((opt: string, i: number) => (
                  <motion.button key={i}
                    onClick={() => handleSelect(i)}
                    disabled={answered}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3"
                    style={getStyle(i)}
                    whileHover={!answered ? { scale: 1.01 } : {}}
                    whileTap={!answered ? { scale: 0.99 } : {}}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: answered && i === q.correctAnswer ? 'rgba(34,197,94,0.2)' :
                                     answered && i === selected ? 'rgba(239,68,68,0.2)' :
                                     'rgba(245,168,0,0.1)',
                        color: answered && i === q.correctAnswer ? '#22c55e' :
                               answered && i === selected ? '#ef4444' : '#F5A800',
                      }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                    {answered && i === q.correctAnswer && <span className="ml-auto">✓</span>}
                    {answered && i === selected && i !== q.correctAnswer && <span className="ml-auto">✗</span>}
                  </motion.button>
                ))}
              </div>
              {answered && q.explanation && (
                <div className="mx-6 mb-5 px-4 py-3 rounded-xl text-sm text-text-secondary leading-relaxed"
                  style={{ background: 'rgba(245,168,0,0.06)', border: '1px solid rgba(245,168,0,0.15)' }}>
                  <span className="text-gold font-semibold">Explanation: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Navigation */}
      {questions.length > 0 && (
        <div className="flex items-center justify-between gap-4">
          <button onClick={goPrev} disabled={current === 0}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-30"
            style={{ background: 'rgba(255,255,255,0.04)', color: '#8B91A8', border: '1px solid rgba(255,255,255,0.1)' }}>
            ← Previous
          </button>
          {current < questions.length - 1 ? (
            <button onClick={goNext} disabled={!answered}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-30"
              style={{ background: 'rgba(245,168,0,0.1)', color: '#F5A800', border: '1px solid rgba(245,168,0,0.25)' }}>
              Next →
            </button>
          ) : (
            <button onClick={() => setShowResults(true)} disabled={!allDone}
              className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 disabled:opacity-30"
              style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)' }}>
              See Results
            </button>
          )}
        </div>
      )}
    </div>
  )
}

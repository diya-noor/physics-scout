'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MCQ {
  _id: string
  question: string
  options: string[]
  correctAnswer: number
  topic?: string
  difficulty?: string
  explanation?: string
  publishedAt?: string
}

interface Props {
  mcq: MCQ
  onAnswer?: (correct: boolean) => void
  showDate?: boolean
}

const difficultyColor: Record<string, string> = {
  Easy:   'rgba(34,197,94,0.15)',
  Medium: 'rgba(245,168,0,0.15)',
  Hard:   'rgba(239,68,68,0.15)',
}
const difficultyText: Record<string, string> = {
  Easy:   '#22c55e',
  Medium: '#F5A800',
  Hard:   '#ef4444',
}

export default function MCQCard({ mcq, onAnswer, showDate }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  const handleSelect = (i: number) => {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    onAnswer?.(i === mcq.correctAnswer)
  }

  const getOptionStyle = (i: number) => {
    if (!answered) return {
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(245,168,0,0.15)',
      color: '#A8ABBE',
    }
    if (i === mcq.correctAnswer) return {
      background: 'rgba(34,197,94,0.12)',
      border: '1px solid rgba(34,197,94,0.5)',
      color: '#22c55e',
    }
    if (i === selected) return {
      background: 'rgba(239,68,68,0.12)',
      border: '1px solid rgba(239,68,68,0.5)',
      color: '#ef4444',
    }
    return {
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      color: '#8B91A8',
    }
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: '#0D1117', border: '1px solid rgba(245,168,0,0.15)' }}
    >
      {/* Card header */}
      <div className="px-6 pt-5 pb-4 flex flex-wrap items-center gap-2"
        style={{ borderBottom: '1px solid rgba(245,168,0,0.08)' }}>
        {mcq.topic && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: 'rgba(33,150,243,0.12)', color: '#2196F3', border: '1px solid rgba(33,150,243,0.2)' }}>
            {mcq.topic}
          </span>
        )}
        {mcq.difficulty && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: difficultyColor[mcq.difficulty] || 'rgba(255,255,255,0.05)', color: difficultyText[mcq.difficulty] || '#A8ABBE', border: `1px solid ${difficultyText[mcq.difficulty] || '#A8ABBE'}33` }}>
            {mcq.difficulty}
          </span>
        )}
        {showDate && mcq.publishedAt && (
          <span className="text-xs text-text-muted ml-auto">
            {new Date(mcq.publishedAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        )}
      </div>

      {/* Question */}
      <div className="px-6 py-5">
        <p className="text-text-primary font-medium text-base leading-relaxed">{mcq.question}</p>
      </div>

      {/* Options */}
      <div className="px-6 pb-5 flex flex-col gap-3">
        {mcq.options.map((opt, i) => (
          <motion.button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={answered}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-3"
            style={getOptionStyle(i)}
            whileHover={!answered ? { scale: 1.01 } : {}}
            whileTap={!answered ? { scale: 0.99 } : {}}
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: answered && i === mcq.correctAnswer ? 'rgba(34,197,94,0.2)' :
                             answered && i === selected ? 'rgba(239,68,68,0.2)' :
                             'rgba(245,168,0,0.1)',
                color: answered && i === mcq.correctAnswer ? '#22c55e' :
                       answered && i === selected ? '#ef4444' : '#F5A800',
              }}>
              {String.fromCharCode(65 + i)}
            </span>
            {opt}
            {answered && i === mcq.correctAnswer && <span className="ml-auto">✓</span>}
            {answered && i === selected && i !== mcq.correctAnswer && <span className="ml-auto">✗</span>}
          </motion.button>
        ))}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {answered && mcq.explanation && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="mx-6 mb-5 px-4 py-3 rounded-xl text-sm text-text-secondary leading-relaxed"
              style={{ background: 'rgba(245,168,0,0.06)', border: '1px solid rgba(245,168,0,0.15)' }}>
              <span className="text-gold font-semibold">Explanation: </span>
              {mcq.explanation}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result banner */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-6 mb-5 px-4 py-2.5 rounded-xl text-sm font-semibold text-center"
            style={selected === mcq.correctAnswer
              ? { background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)' }
              : { background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }
            }
          >
            {selected === mcq.correctAnswer ? '🎉 Correct! Well done.' : `❌ Wrong. Correct answer: ${String.fromCharCode(65 + mcq.correctAnswer)}`}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

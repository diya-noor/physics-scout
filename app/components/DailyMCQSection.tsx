'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import MCQCard from './MCQCard'

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
  mcq: MCQ | null
  sectionLabel?: string
  sectionHeading?: string
  sectionDescription?: string
  emptyState?: string
  seeAllLink?: string
}

export default function DailyMCQSection({ mcq, sectionLabel, sectionHeading, sectionDescription, emptyState, seeAllLink }: Props) {
  const [answered, setAnswered] = useState(false)

  return (
    <section id="mcqs" className="py-24" style={{ backgroundColor: '#060810' }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-10"
        >
          <p className="text-gold text-xs uppercase tracking-widest font-semibold mb-3">
            {sectionLabel || 'Daily Practice'}
          </p>
          <h2 className="font-display text-4xl font-extrabold text-text-primary">
            {sectionHeading || "Today\u2019s MCQ"}
          </h2>
          <p className="text-text-secondary mt-3">
            {sectionDescription || "Test your physics knowledge with today\u2019s challenge question."}
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {mcq ? (
            <MCQCard mcq={mcq} onAnswer={() => setAnswered(true)} showDate />
          ) : (
            <div
              className="rounded-2xl p-12 text-center"
              style={{ background: '#0D1117', border: '1px solid rgba(245,168,0,0.12)' }}
            >
              <div className="text-5xl mb-4">🔬</div>
              <p className="text-text-muted text-sm">{emptyState || 'No question published today. Check back soon!'}</p>
            </div>
          )}
        </motion.div>

        {/* Link to all MCQs */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/mcqs"
            className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:gap-3 transition-all duration-200"
          >
            {seeAllLink || 'See All MCQs →'}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

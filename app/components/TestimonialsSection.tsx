'use client'

import { motion } from 'framer-motion'
import TestimonialCarousel from './TestimonialCarousel'

interface Testimonial {
  studentName: string
  review: string
  rating: number
  level?: string
}

interface Props {
  testimonials: Testimonial[]
  sectionLabel?: string
  sectionHeading?: string
  sectionDescription?: string
}

export default function TestimonialsSection({ testimonials, sectionLabel, sectionHeading, sectionDescription }: Props) {
  if (!testimonials || testimonials.length === 0) return null

  return (
    <section className="py-24 overflow-hidden" style={{ backgroundColor: '#0D1117' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <p className="text-gold text-xs uppercase tracking-widest font-semibold mb-3">
            {sectionLabel || 'Student Reviews'}
          </p>
          <h2 className="font-display text-4xl font-extrabold text-text-primary">
            {sectionHeading || 'What Students Say'}
          </h2>
          <p className="text-text-secondary mt-3 max-w-lg mx-auto">
            {sectionDescription || 'Real feedback from students who have learned with Physics Scout Academy.'}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <TestimonialCarousel testimonials={testimonials} />
      </motion.div>
    </section>
  )
}

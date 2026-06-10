'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCourses } from '@/app/lib/hooks'

const defaultCourses = [
  {
    title: 'Foundation Physics',
    level: 'Matric / O-Level',
    description:
      'Mechanics, thermodynamics, and optics for school-level learners. Build a solid conceptual base from the ground up.',
    fee: 'PKR 2,000/mo',
    tags: ['Onsite', 'Online'],
  },
  {
    title: 'Electromagnetism & Waves',
    level: 'FSc Part 2',
    description:
      'From electric fields and circuits to wave optics — a comprehensive study of electromagnetic phenomena.',
    fee: 'PKR 2,500/mo',
    tags: ['Onsite', 'Online'],
  },
  {
    title: 'Modern Physics',
    level: 'BSc / Advanced',
    description:
      'Quantum mechanics, atomic structure, nuclear physics, and special relativity for advanced students.',
    fee: 'PKR 3,000/mo',
    tags: ['Online'],
  },
  {
    title: 'Mathematical Physics',
    level: 'BSc',
    description:
      'Vectors, calculus, and differential equations applied in physical contexts — the language of physics mastered.',
    fee: 'PKR 2,500/mo',
    tags: ['Onsite'],
  },
  {
    title: 'FSc / BSc Exam Prep',
    level: 'FSc / BSc',
    description:
      'Past paper drills, speed techniques, and exam strategy. Targeted preparation for board and university exams.',
    fee: 'PKR 2,000/mo',
    tags: ['Onsite', 'Online'],
  },
  {
    title: 'MDCAT Physics',
    level: 'MDCAT / Entry Test',
    description:
      'MCQ-focused, concept-driven sessions covering the full MDCAT syllabus with timed practice tests.',
    fee: 'PKR 3,500/mo',
    tags: ['Online', 'Onsite'],
    featured: true,
  },
  {
    title: 'Science Communication',
    level: 'All Levels',
    description:
      'Develop intuition for physics and the ability to explain real phenomena clearly and confidently.',
    fee: 'Free Trial',
    tags: ['Online'],
  },
]

export default function Courses() {
  const { data: courses } = useCourses()

  const items = courses && courses.length > 0
    ? courses.map((c: any) => ({
        title: c.title,
        level: c.level || 'All Levels',
        description: c.description || '',
        fee: c.isFree ? 'Free' : c.fee ? `PKR ${c.fee.toLocaleString()}/mo` : '',
        tags: c.mode ? [c.mode] : [],
        featured: false,
      }))
    : defaultCourses

  return (
    <section id="courses" className="py-28" style={{ backgroundColor: '#060810' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-xs uppercase tracking-widest font-semibold mb-3"
            style={{ color: '#F5A800' }}>
            What We Offer
          </p>
          <h2 className="font-display text-4xl font-extrabold text-text-primary">
            Courses at Physics Scout
          </h2>
          <p className="text-text-secondary mt-3 max-w-lg text-sm leading-relaxed">
            Structured programmes from school to MDCAT and university — online and onsite.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px mt-14"
          style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, overflow: 'hidden' }}>
          {items.map((course: any, i: number) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.07 }}
              className="group relative flex flex-col p-7 cursor-default"
              style={{
                background: course.featured ? 'rgba(245,168,0,0.03)' : '#060810',
                transition: 'background 0.2s ease',
              }}
              whileHover={{ backgroundColor: course.featured ? 'rgba(245,168,0,0.06)' : 'rgba(255,255,255,0.02)' } as any}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs"
                  style={{ color: 'rgba(255,255,255,0.18)', letterSpacing: '0.08em' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {course.featured && (
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded"
                    style={{
                      background: 'rgba(245,168,0,0.1)',
                      color: '#F5A800',
                      border: '1px solid rgba(245,168,0,0.2)',
                      letterSpacing: '0.06em',
                    }}>
                    MDCAT
                  </span>
                )}
              </div>

              <p className="text-xs font-medium uppercase tracking-widest mb-2"
                style={{ color: 'rgba(255,255,255,0.35)' }}>
                {course.level}
              </p>

              <h3 className="font-display font-bold text-text-primary leading-snug"
                style={{ fontSize: '1.05rem' }}>
                {course.title}
              </h3>

              <p className="text-text-muted text-sm leading-relaxed mt-3 flex-1">
                {course.description}
              </p>

              <div className="mt-6 pt-4 flex items-center justify-between"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="font-display font-bold text-sm"
                  style={{ color: course.featured ? '#F5A800' : 'rgba(255,255,255,0.6)' }}>
                  {course.fee}
                </span>
                <div className="flex gap-1.5">
                  {course.tags.map((tag: string) => (
                    <span key={tag}
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.35)',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link href="/courses"
            className="text-sm font-medium transition-all duration-200"
            style={{ color: 'rgba(255,255,255,0.35)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5A800')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}>
            View all courses →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

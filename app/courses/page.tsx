'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CourseCard from '../components/CourseCard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCourses } from '@/app/lib/hooks'

const FILTERS = ['All', 'Online', 'Onsite', 'Free', 'Paid']

export default function CoursesPage() {
  const { data: courses, isLoading: loading } = useCourses()
  const [filter, setFilter] = useState('All')

  const filtered = (courses || []).filter(c => {
    if (filter === 'Online') return c.mode === 'Online' || c.mode === 'Both'
    if (filter === 'Onsite') return c.mode === 'Onsite' || c.mode === 'Both'
    if (filter === 'Free')   return c.isFree
    if (filter === 'Paid')   return !c.isFree
    return true
  })

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20" style={{ background: '#060810' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mb-10">
            <p className="text-gold text-xs uppercase tracking-widest font-semibold mb-2">All Programmes</p>
            <h1 className="font-display text-4xl font-extrabold text-text-primary">Courses</h1>
            <p className="text-text-secondary mt-2 max-w-lg">
              Structured physics programmes for every level — from school to university.
            </p>
          </motion.div>

          {/* Filter bar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-10">
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200"
                style={filter === f
                  ? { background: '#F5A800', color: '#000' }
                  : { background: 'rgba(255,255,255,0.04)', color: '#8B91A8', border: '1px solid rgba(255,255,255,0.1)' }}>
                {f}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl h-64 animate-pulse"
                  style={{ background: '#0D1117', border: '1px solid rgba(245,168,0,0.08)' }} />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((course, i) => (
                  <CourseCard key={course._id} course={course} index={i} />
                ))}
              </div>
            </AnimatePresence>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="py-24 text-center rounded-2xl"
              style={{ background: '#0D1117', border: '1px solid rgba(245,168,0,0.1)' }}>
              <div className="text-5xl mb-4">📚</div>
              <p className="text-text-muted">No courses found. Check back soon!</p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

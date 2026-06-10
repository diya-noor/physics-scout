'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Course {
  _id: string
  title: string
  description?: string
  level?: string
  mode?: string
  youtubeUrl?: string
  isFree?: boolean
  fee?: number
  pdfUrl?: string
  thumbnailUrl?: string
}

const GRADIENT_FALLBACKS = [
  'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
  'linear-gradient(135deg, #C47F00 0%, #F5A800 100%)',
  'linear-gradient(135deg, #1C2333 0%, #2196F3 100%)',
  'linear-gradient(135deg, #0D1117 0%, #1565C0 100%)',
]

interface Props {
  course: Course
  index: number
}

export default function CourseCard({ course, index }: Props) {
  return (
    <motion.div
      className="group rounded-2xl overflow-hidden flex flex-col"
      style={{ background: '#0D1117', border: '1px solid rgba(245,168,0,0.12)' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6, borderColor: 'rgba(245,168,0,0.4)', boxShadow: '0 20px 50px rgba(245,168,0,0.12)' }}
    >
      <Link href={`/courses/${course._id}`} className="flex flex-col flex-1">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        {course.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={course.thumbnailUrl} alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl"
            style={{ background: GRADIENT_FALLBACKS[index % GRADIENT_FALLBACKS.length] }}>
            📚
          </div>
        )}
        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={course.isFree
              ? { background: 'rgba(34,197,94,0.9)', color: '#fff' }
              : { background: 'rgba(245,168,0,0.9)', color: '#000' }}>
            {course.isFree ? 'Free' : `PKR ${course.fee?.toLocaleString()}`}
          </span>
          {course.mode && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={course.mode === 'Online'
                ? { background: 'rgba(33,150,243,0.9)', color: '#fff' }
                : course.mode === 'Onsite'
                ? { background: 'rgba(245,168,0,0.9)', color: '#000' }
                : { background: 'rgba(139,91,168,0.9)', color: '#fff' }}>
              {course.mode}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {course.level && (
          <span className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2">{course.level}</span>
        )}
        <h3 className="font-display font-bold text-text-primary text-base leading-snug mb-2">{course.title}</h3>
        {course.description && (
          <p className="text-text-secondary text-sm leading-relaxed flex-1 line-clamp-3">{course.description}</p>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mt-4" onClick={e => e.stopPropagation()}>
          {course.youtubeUrl && (
            <a href={course.youtubeUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
              style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.22)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.12)' }}>
              ▶ YouTube
            </a>
          )}
          {course.pdfUrl && (
            <a href={course.pdfUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200"
              style={{ background: 'rgba(245,168,0,0.10)', color: '#F5A800', border: '1px solid rgba(245,168,0,0.2)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(245,168,0,0.2)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(245,168,0,0.1)' }}>
              ↓ Notes PDF
            </a>
          )}
          {!course.youtubeUrl && !course.pdfUrl && (
            <div className="flex-1 py-2 text-center text-xs text-text-muted">Coming soon</div>
          )}
        </div>
      </div>
    </Link>
    </motion.div>
  )
}

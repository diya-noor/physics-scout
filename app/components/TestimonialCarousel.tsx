'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Testimonial {
  studentName: string
  review: string
  rating: number
  level?: string
}

interface Props {
  testimonials: Testimonial[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= rating ? '#F5A800' : '#2a2e3a', fontSize: '14px' }}>★</span>
      ))}
    </div>
  )
}

const INITIALS_COLORS = ['#F5A800','#2196F3','#22c55e','#a855f7','#ef4444','#06b6d4']

export default function TestimonialCarousel({ testimonials }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const doubled = [...testimonials, ...testimonials]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let pos = 0
    const speed = 0.5
    let raf: number
    const step = () => {
      pos += speed
      if (pos >= track.scrollWidth / 2) pos = 0
      track.style.transform = `translateX(-${pos}px)`
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    const pause = () => cancelAnimationFrame(raf)
    const resume = () => { raf = requestAnimationFrame(step) }
    track.parentElement?.addEventListener('mouseenter', pause)
    track.parentElement?.addEventListener('mouseleave', resume)
    return () => {
      cancelAnimationFrame(raf)
      track.parentElement?.removeEventListener('mouseenter', pause)
      track.parentElement?.removeEventListener('mouseleave', resume)
    }
  }, [testimonials])

  return (
    <div className="overflow-hidden relative">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0D1117, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #0D1117, transparent)' }} />

      <div ref={trackRef} className="flex gap-5 will-change-transform" style={{ width: 'max-content' }}>
        {doubled.map((t, i) => (
          <motion.div key={i}
            className="flex-shrink-0 rounded-2xl p-6 flex flex-col gap-3"
            style={{
              width: 300,
              background: '#141A24',
              border: '1px solid rgba(245,168,0,0.12)',
            }}
          >
            <StarRating rating={t.rating} />
            <p className="text-text-secondary text-sm leading-relaxed line-clamp-4">&ldquo;{t.review}&rdquo;</p>
            <div className="flex items-center gap-3 mt-auto pt-3"
              style={{ borderTop: '1px solid rgba(245,168,0,0.08)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                style={{ background: INITIALS_COLORS[i % INITIALS_COLORS.length] + '22', color: INITIALS_COLORS[i % INITIALS_COLORS.length] }}>
                {t.studentName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-text-primary text-sm font-semibold">{t.studentName}</p>
                {t.level && <p className="text-text-muted text-xs">{t.level}</p>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

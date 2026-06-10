'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  text: string
  link?: string
  type?: 'info' | 'batch' | 'exam'
}

const STORAGE_KEY = 'ps_banner_dismissed'

const bgMap = {
  exam:  { bg: 'rgba(220,38,38,0.92)',   border: 'rgba(220,38,38,0.5)',   text: '#fff' },
  batch: { bg: 'rgba(245,168,0,0.92)',    border: 'rgba(245,168,0,0.6)',   text: '#000' },
  info:  { bg: 'rgba(33,150,243,0.92)',   border: 'rgba(33,150,243,0.5)',  text: '#fff' },
}

export default function AnnouncementBanner({ text, link, type = 'info' }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY)
    if (!dismissed) setVisible(true)
  }, [])

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  const colors = bgMap[type]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-[60] overflow-hidden"
          style={{ background: colors.bg, borderBottom: `1px solid ${colors.border}` }}
        >
          <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-center gap-3">
            <span className="text-xs font-semibold tracking-wide text-center" style={{ color: colors.text }}>
              {type === 'exam' && '⚠️ '}
              {type === 'batch' && '🎓 '}
              {type === 'info' && 'ℹ️ '}
              {text}
              {link && (
                <a href={link} target="_blank" rel="noopener noreferrer"
                  className="underline ml-2 opacity-80 hover:opacity-100">
                  Learn more →
                </a>
              )}
            </span>
            <button
              onClick={dismiss}
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: colors.text }}
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

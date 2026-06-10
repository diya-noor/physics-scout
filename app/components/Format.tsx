'use client'

import { motion } from 'framer-motion'

interface FormatItem {
  title: string
  tagline: string
  accent: string
  bullets: string[]
}

interface Props {
  formats?: FormatItem[]
}

function OnlineIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

function OnsiteIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

const defaultFormats = [
  {
    Icon: OnlineIcon,
    title: 'Online Classes',
    tagline: 'Study from anywhere',
    accent: '#2196F3',
    bullets: [
      'Live sessions via video call',
      'Recorded lectures available 24/7',
      'Digital study materials & notes',
      'WhatsApp / social media support',
      'Global access — no geography limit',
    ],
  },
  {
    Icon: OnsiteIcon,
    title: 'Onsite Classes',
    tagline: 'Face-to-face learning',
    accent: '#F5A800',
    bullets: [
      'Face-to-face classroom sessions',
      'Small batch sizes for focused learning',
      'Physical lab demonstrations',
      'Structured weekly timetable',
      'Immediate doubt resolution',
    ],
  },
]

function DotIcon() {
  return <span className="flex-shrink-0 w-1 h-1 rounded-full" style={{ background: 'var(--dot-color)', opacity: 0.6 }} />
}

export default function Format({ formats }: Props) {
  const items = (formats && formats.length > 0 ? formats : defaultFormats).map((f, i) => ({
    ...f,
    Icon: i === 0 ? OnlineIcon : OnsiteIcon,
  }))
  return (
    <section id="format" className="py-24" style={{ backgroundColor: '#0D1117' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-xs uppercase tracking-widest font-semibold mb-3"
            style={{ color: '#F5A800' }}>
            Learning Formats
          </p>
          <h2 className="font-display text-4xl font-extrabold text-text-primary">Learn Your Way</h2>
          <p className="text-text-secondary mt-3 max-w-lg text-sm leading-relaxed">
            Whether you&apos;re across the world or around the corner, Physics Scout has a format
            designed for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          {items.map((fmt, i) => (
            <motion.div
              key={fmt.title}
              className="rounded-2xl p-8 card-hover"
              style={{
                background: '#141A24',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 + i * 0.1 }}
            >
              {/* Icon + title row */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: `${fmt.accent}12`,
                    border: `1px solid ${fmt.accent}22`,
                    color: fmt.accent,
                  }}>
                  <fmt.Icon />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-text-primary">
                    {fmt.title}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {fmt.tagline}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 20 }} />

              {/* Bullets */}
              <ul className="flex flex-col gap-3">
                {fmt.bullets.map((item: string) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-text-muted">
                    <div className="flex-shrink-0 w-1 h-1 rounded-full"
                      style={{ background: fmt.accent, opacity: 0.6 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

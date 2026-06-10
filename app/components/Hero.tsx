'use client'

import { motion } from 'framer-motion'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut', delay },
})

interface Props {
  badge?: string
  headline?: string
  description?: string
  ctaPrimary?: string
  ctaSecondary?: string
  backgroundImage?: string
  stats?: { value: string; label: string }[]
}

export default function Hero({ badge, headline, description, ctaPrimary, ctaSecondary, backgroundImage, stats }: Props) {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage || 'https://images.unsplash.com/photo-1755167611440-3812d81aa757?w=1920&q=85'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(6,8,16,0.82) 0%, rgba(6,8,16,0.65) 50%, rgba(6,8,16,0.80) 100%)' }} />
      <div className="absolute inset-0 grid-overlay pointer-events-none opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #060810)' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 w-full pt-32 pb-20 flex flex-col items-center text-center">
        <motion.div {...fadeUp(0.05)}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold text-gold mb-6"
            style={{ border: '1px solid rgba(245,168,0,0.3)', background: 'rgba(245,168,0,0.07)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot inline-block" />
            {badge || 'Online & Onsite Academy'}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.12)}>
          <h1 className="font-display font-extrabold leading-tight tracking-tight"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 4.5rem)' }}
            dangerouslySetInnerHTML={{ __html: headline || '<span class="text-gold">Physics</span> <span class="text-blue-light">Scout</span>' }} />
        </motion.div>

        <motion.p className="text-text-secondary text-base max-w-2xl leading-relaxed mt-4" {...fadeUp(0.22)}>
          {description || 'Expert-led physics education by Irfan Haider — Associate Member of the Institute of Physics, UK. From fundamentals to advanced concepts, taught the way science was meant to be learned.'}
        </motion.p>

        <motion.div className="flex flex-wrap gap-4 justify-center mt-8" {...fadeUp(0.38)}>
          <motion.button onClick={() => handleScroll('#courses')}
            className="font-display font-bold px-9 py-3.5 rounded-lg text-sm tracking-wide border-2 border-gold bg-gold text-black"
            whileHover={{ backgroundColor: 'transparent', color: '#F5A800', scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
            {ctaPrimary || 'Explore Courses'}
          </motion.button>
          <motion.button onClick={() => handleScroll('#contact')}
            className="font-display font-bold px-9 py-3.5 rounded-lg text-sm tracking-wide border-2 text-text-primary"
            style={{ borderColor: 'rgba(255,255,255,0.18)' }}
            whileHover={{ borderColor: '#2196F3', color: '#2196F3', scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
            {ctaSecondary || 'Contact Us'}
          </motion.button>
        </motion.div>

        <motion.div className="flex flex-wrap gap-10 justify-center mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(245,168,0,0.15)' }} {...fadeUp(0.46)}>
          {(stats || []).map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-extrabold text-gold">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

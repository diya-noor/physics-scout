'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const DEFAULT_NAV = [
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Format', href: '#format' },
  { label: 'Contact', href: '#contact' },
]

interface Props {
  navLinks?: { label: string; href: string }[]
  ctaText?: string
}

export default function Navbar({ navLinks, ctaText }: Props) {
  const links = navLinks && navLinks.length > 0 ? navLinks : DEFAULT_NAV
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const winHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(winHeight > 0 ? (window.scrollY / winHeight) * 100 : 0)
      const sections = links.map((l) => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [links])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.querySelector(href)
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      })
    })
  }

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(6,8,16,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(245,168,0,0.08)' : '1px solid transparent',
      }}
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="rounded-full overflow-hidden flex-shrink-0"
            style={{ width: 48, height: 48, border: '2px solid rgba(245,168,0,0.5)', boxShadow: '0 0 12px rgba(245,168,0,0.25)' }}>
            <Image src="/physics-scout-logo.jpeg" alt="Physics Scout Academy" width={48} height={48} priority
              style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight hidden sm:block">
            <span className="text-blue-light">Physics</span>
            <span className="text-gold">Scout</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <button key={link.href} onClick={() => handleNavClick(link.href)}
                className="relative text-sm font-medium tracking-wide transition-colors duration-200"
                style={{ color: isActive ? '#F5A800' : '#8B91A8' }}>
                {link.label}
                {isActive && <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gold" />}
              </button>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <motion.button onClick={() => handleNavClick('#contact')}
            className="bg-gold text-black font-display font-bold text-sm px-5 py-2 rounded-md tracking-wide"
            whileHover={{ scale: 1.03, filter: 'brightness(1.1)', y: -1 }}
            whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
            {ctaText || 'Enroll Now'}
          </motion.button>
        </div>

        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <motion.span className="block w-5 h-0.5 bg-text-primary rounded" animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
          <motion.span className="block w-5 h-0.5 bg-text-primary rounded" animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} />
          <motion.span className="block w-5 h-0.5 bg-text-primary rounded" animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="md:hidden border-t border-surface-3 bg-surface-1"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <button key={link.href} onClick={() => handleNavClick(link.href)}
                  className="text-left py-3 text-text-secondary text-sm font-medium border-b border-surface-3 last:border-0 hover:text-gold transition-colors">
                  {link.label}
                </button>
              ))}
              <button onClick={() => handleNavClick('#contact')}
                className="mt-3 bg-gold text-black font-display font-bold text-sm px-5 py-2.5 rounded-md tracking-wide w-full">
                {ctaText || 'Enroll Now'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 h-[1px] transition-all duration-100"
        style={{ width: `${scrollProgress}%`, background: 'linear-gradient(90deg, rgba(245,168,0,0.5), rgba(33,150,243,0.5))' }} />
    </motion.header>
  )
}

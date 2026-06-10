'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const scrollReveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: 'easeOut' },
}

const DEFAULT_EMAIL = 'irfan.haider48@outlook.com'
const DEFAULT_PHONE = '+92 (0) 307 0003548'
const DEFAULT_PHONE_CLEAN = '+923070003548'

const DEFAULT_COURSES = [
  'Foundation Physics (Matric/O-Level)',
  'Electromagnetism & Waves (FSc Part 2)',
  'Modern Physics (BSc/Advanced)',
  'Mathematical Physics (BSc)',
  'FSc / BSc Exam Preparation',
  'MDCAT Physics',
  'Science Communication',
  'Not sure yet',
]

function TikTokIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
    </svg>
  )
}
function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}
function YouTubeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const DEFAULT_SOCIALS = [
  { label: 'TikTok',   href: 'https://www.tiktok.com/@physics.scout',       Icon: TikTokIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/share/1J7aAipsN9/', Icon: FacebookIcon },
  { label: 'YouTube',  href: 'https://youtube.com/@physics-scout',          Icon: YouTubeIcon },
]

interface Props {
  email?: string
  phone?: string
  location?: string
  socialLinks?: { platform: string; url: string }[]
  courseOptions?: string[]
}

interface FormData {
  name: string
  email: string
  phone: string
  course: string
  message: string
  mode: string
}

function socialIcon(platform: string) {
  const match = DEFAULT_SOCIALS.find(s => s.label.toLowerCase() === platform.toLowerCase())
  return match ? <match.Icon /> : null
}

export default function Contact({
  email = DEFAULT_EMAIL,
  phone = DEFAULT_PHONE,
  location = 'Parachinar, District Kurram, Pakistan',
  socialLinks,
  courseOptions,
}: Props) {
  const phoneClean = phone.replace(/[\s()]/g, '').replace(/^0/, '+92')
  const courses = courseOptions && courseOptions.length > 0 ? courseOptions : DEFAULT_COURSES
  const socials = socialLinks && socialLinks.length > 0
    ? socialLinks.map(s => ({
        label: s.platform,
        href: s.url,
        Icon: () => <>{socialIcon(s.platform)}</>,
      }))
    : DEFAULT_SOCIALS
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', course: '', message: '', mode: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validate = () => {
    const e: Partial<FormData> = {}
    if (!form.name.trim())  e.name  = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone / WhatsApp is required'
    if (!form.course)       e.course = 'Please select a course'
    return e
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    const subject = encodeURIComponent(`Enrollment Enquiry — ${form.course}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone/WhatsApp: ${form.phone}\nEmail: ${form.email || 'N/A'}\nCourse: ${form.course}\nMode: ${form.mode || 'Not specified'}\n\nMessage:\n${form.message || 'No message'}`,
    )
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const field = (key: keyof FormData) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm(f => ({ ...f, [key]: e.target.value }))
      setErrors(er => ({ ...er, [key]: undefined }))
    },
  })

  return (
    <section id="contact" className="py-24" style={{ backgroundColor: '#060810' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* Header */}
        <motion.div {...scrollReveal}>
          <p className="text-gold text-xs uppercase tracking-widest font-semibold mb-3">Get in Touch</p>
          <h2 className="font-display text-4xl font-extrabold text-text-primary">Enroll or Enquire</h2>
          <p className="text-text-secondary mt-3 max-w-lg">
            Fill out the form and we&apos;ll get back to you within 24 hours — or reach out directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 mt-12">

          {/* ── LEFT — Contact info ── */}
          <motion.div {...scrollReveal} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}>

            {[
              { href: `mailto:${email}`, icon: '📧', label: 'Email', value: email },
              { href: `tel:${phoneClean}`, icon: '📞', label: 'Phone / WhatsApp', value: phone },
              { href: undefined, icon: '📍', label: 'Location', value: location },
            ].map(item => (
              <div
                key={item.label}
                className={`flex items-center gap-4 p-4 rounded-xl mb-4 transition-all duration-200 group ${item.href ? 'cursor-pointer' : ''}`}
                style={{ backgroundColor: '#0D1117', border: '1px solid rgba(245,168,0,0.12)' }}
                onClick={() => item.href && window.open(item.href)}
                onMouseEnter={e => { if (item.href) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,168,0,0.3)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,168,0,0.12)' }}
              >
                <div className="flex-shrink-0 flex items-center justify-center rounded-xl text-xl"
                  style={{ width: 42, height: 42, background: 'rgba(245,168,0,0.1)' }}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-text-muted font-medium">{item.label}</p>
                  <p className="text-sm text-text-primary font-medium group-hover:text-gold transition-colors">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="mt-6">
              <p className="text-xs uppercase tracking-widest text-text-muted font-semibold mb-3">Follow on Social</p>
              <div className="flex flex-wrap gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-text-muted text-xs font-medium"
                    style={{ border: '1px solid rgba(245,168,0,0.12)', backgroundColor: '#0D1117' }}
                    whileHover={{ borderColor: 'rgba(245,168,0,0.4)', color: '#F5A800' }}
                    transition={{ duration: 0.2 }}>
                    <Icon /> {label}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick WhatsApp */}
            <motion.a
              href={`https://wa.me/${phoneClean}?text=Hello%2C%20I%20want%20to%20enroll%20in%20Physics%20Scout%20Academy`}
              target="_blank" rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold"
              style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)', color: '#25D366' }}
              whileHover={{ background: 'rgba(37,211,102,0.2)' } as any}
              transition={{ duration: 0.2 }}
            >
              <span>💬</span> Chat on WhatsApp
            </motion.a>
          </motion.div>

          {/* ── RIGHT — Enrollment Form ── */}
          <motion.div {...scrollReveal} transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}>
            <div className="rounded-3xl p-8"
              style={{ backgroundColor: '#0D1117', border: '1px solid rgba(245,168,0,0.2)' }}>

              <h3 className="font-display font-bold text-xl text-text-primary mb-1">Enrollment Form</h3>
              <p className="text-text-muted text-xs mb-6">All fields marked * are required.</p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center">
                    <div className="text-5xl mb-4">🎉</div>
                    <h4 className="font-display font-bold text-text-primary text-lg mb-2">Enquiry Sent!</h4>
                    <p className="text-text-secondary text-sm">
                      Your email app has opened. We&apos;ll reply within 24 hours.
                    </p>
                    <button onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',course:'',message:'',mode:'' }) }}
                      className="mt-6 text-xs text-gold underline">
                      Send another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Name */}
                    <div>
                      <label className="block text-xs text-text-muted mb-1.5 font-medium">Full Name *</label>
                      <input type="text" placeholder="e.g. Ali Hassan" {...field('name')}
                        className="w-full px-4 py-3 rounded-xl text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-200"
                        style={{ background: '#141A24', border: `1px solid ${errors.name ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}` }}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(245,168,0,0.4)' }}
                        onBlur={e => { e.currentTarget.style.borderColor = errors.name ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)' }} />
                      {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs text-text-muted mb-1.5 font-medium">Phone / WhatsApp *</label>
                      <input type="tel" placeholder="e.g. 03001234567" {...field('phone')}
                        className="w-full px-4 py-3 rounded-xl text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-200"
                        style={{ background: '#141A24', border: `1px solid ${errors.phone ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}` }}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(245,168,0,0.4)' }}
                        onBlur={e => { e.currentTarget.style.borderColor = errors.phone ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)' }} />
                      {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs text-text-muted mb-1.5 font-medium">Email (optional)</label>
                      <input type="email" placeholder="you@example.com" {...field('email')}
                        className="w-full px-4 py-3 rounded-xl text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-200"
                        style={{ background: '#141A24', border: '1px solid rgba(255,255,255,0.08)' }}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(245,168,0,0.4)' }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }} />
                    </div>

                    {/* Course */}
                    <div>
                      <label className="block text-xs text-text-muted mb-1.5 font-medium">Course Interested In *</label>
                      <select {...field('course')}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 appearance-none cursor-pointer"
                        style={{ background: '#141A24', border: `1px solid ${errors.course ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)'}`, color: form.course ? '#E8EAF0' : '#8B91A8' }}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(245,168,0,0.4)' }}
                        onBlur={e => { e.currentTarget.style.borderColor = errors.course ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.08)' }}>
                        <option value="" disabled>Select a course...</option>
                        {courses.map(c => <option key={c} value={c} style={{ background: '#141A24' }}>{c}</option>)}
                      </select>
                      {errors.course && <p className="text-xs text-red-400 mt-1">{errors.course}</p>}
                    </div>

                    {/* Mode */}
                    <div>
                      <label className="block text-xs text-text-muted mb-2 font-medium">Preferred Mode</label>
                      <div className="flex gap-3">
                        {['Online', 'Onsite', 'Both'].map(m => (
                          <button type="button" key={m} onClick={() => setForm(f => ({ ...f, mode: m }))}
                            className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
                            style={form.mode === m
                              ? { background: '#F5A800', color: '#000', border: '1px solid #F5A800' }
                              : { background: '#141A24', color: '#8B91A8', border: '1px solid rgba(255,255,255,0.08)' }}>
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs text-text-muted mb-1.5 font-medium">Message (optional)</label>
                      <textarea placeholder="Any questions or specific requirements..." {...field('message')} rows={3}
                        className="w-full px-4 py-3 rounded-xl text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-200 resize-none"
                        style={{ background: '#141A24', border: '1px solid rgba(255,255,255,0.08)' }}
                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(245,168,0,0.4)' }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }} />
                    </div>

                    {/* Submit */}
                    <motion.button type="submit"
                      className="w-full bg-gold text-black font-display font-bold text-sm py-3.5 rounded-xl tracking-wide mt-1"
                      whileHover={{ scale: 1.02, filter: 'brightness(1.1)', y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}>
                      Send Enquiry →
                    </motion.button>

                    <p className="text-center text-text-muted text-xs">
                      Or call/WhatsApp:{' '}
                      <a href={`tel:${phoneClean}`} className="text-gold hover:underline">{phone}</a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

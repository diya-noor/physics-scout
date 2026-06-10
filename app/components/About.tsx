'use client'

import { motion } from 'framer-motion'

interface Props {
  instructorName?: string
  instructorBio?: string
  aboutSectionLabel?: string
  experience?: { title: string; period: string; institution: string; current: boolean }[]
  affiliations?: { name: string; id: string }[]
  educationTitle?: string
  educationDetails?: string
  philosophy?: string
  aboutStats?: { value: string; label: string }[]
}

export default function About({
  instructorName = 'Irfan Haider',
  instructorBio = 'A dedicated physics educator with years of classroom experience and internationally recognised professional memberships.',
  aboutSectionLabel = 'About the Instructor',
  experience = [
    { title: 'Physics Teacher', period: '2015 – 2021', institution: 'USWA Girls Public High School, Parachinar', current: false },
    { title: 'Visiting Lecturer', period: '2021 – Mar 2022', institution: 'University Model College, Parachinar', current: false },
    { title: 'Visiting Lecturer', period: 'Dec 2021 – Present', institution: 'Islamic Girls Public School & College, Parachinar', current: true },
  ],
  affiliations = [
    { name: 'Institute of Physics, UK', id: 'ID: 1158557' },
    { name: 'American Physical Society', id: 'APS: 62069761' },
    { name: 'Royal Microscopical Society', id: 'RMS13425' },
    { name: 'Institution of Civil Engineers', id: 'MICE: 93603586' },
  ],
  educationTitle = 'BS (Hons) in Physics',
  educationDetails = 'Research Complex, Department of Physics, AIOU, Islamabad, Pakistan',
  philosophy = 'Communicating science to society in a friendly, accessible environment — making physics not just a subject, but a way of understanding the world.',
  aboutStats = [
    { value: '9+', label: 'Years Teaching' },
    { value: '4', label: 'Institutions' },
    { value: '4', label: 'Intl. Memberships' },
  ],
}: Props) {
  return (
    <section id="about" className="py-24" style={{ backgroundColor: '#0D1117' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-xs uppercase tracking-widest font-semibold mb-3"
            style={{ color: '#F5A800' }}>
            {aboutSectionLabel}
          </p>
          <h2 className="font-display text-4xl font-extrabold text-text-primary">{instructorName}</h2>
          <p className="text-text-secondary mt-3 max-w-lg text-sm leading-relaxed">
            {instructorBio}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12 items-start">
          {/* Left — Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <p className="text-xs uppercase tracking-widest font-semibold mb-6"
              style={{ color: 'rgba(255,255,255,0.3)' }}>
              Experience
            </p>

            {/* Vertical timeline */}
            <div className="relative">
              {/* Line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px"
                style={{ background: 'rgba(255,255,255,0.07)' }} />

              <div className="flex flex-col gap-8">
                {experience.map((exp: any, i: number) => (
                  <motion.div
                    key={exp.title + exp.period}
                    className="flex gap-5"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  >
                    {/* Dot */}
                    <div className="flex-shrink-0 relative z-10 mt-1.5">
                      <div className="w-3.5 h-3.5 rounded-full"
                        style={{
                          background: exp.current ? '#F5A800' : '#0D1117',
                          border: `1px solid ${exp.current ? '#F5A800' : 'rgba(255,255,255,0.2)'}`,
                        }} />
                    </div>

                    <div>
                      <span className="text-xs font-mono"
                        style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
                        {exp.period}
                      </span>
                      <h4 className="font-display font-bold text-text-primary text-sm mt-1">
                        {exp.title}
                        {exp.current && (
                          <span className="ml-2 text-xs font-medium px-1.5 py-0.5 rounded"
                            style={{
                              background: 'rgba(245,168,0,0.1)',
                              color: '#F5A800',
                              border: '1px solid rgba(245,168,0,0.2)',
                            }}>
                            Current
                          </span>
                        )}
                      </h4>
                      <p className="text-text-muted text-xs mt-0.5 leading-relaxed">
                        {exp.institution}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Affiliations */}
            <div className="mt-10">
              <p className="text-xs uppercase tracking-widest font-semibold mb-4"
                style={{ color: 'rgba(255,255,255,0.3)' }}>
                Professional Affiliations
              </p>
              <div className="grid grid-cols-2 gap-2">
                {affiliations.map((a: any) => (
                  <div key={a.name}
                    className="rounded-lg p-3"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}>
                    <p className="text-xs font-medium leading-snug"
                      style={{ color: 'rgba(255,255,255,0.7)' }}>
                      {a.name}
                    </p>
                    <p className="text-xs mt-0.5 font-mono"
                      style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {a.id}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Education + Philosophy */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            {/* Education */}
            <div className="rounded-2xl p-7 card-hover"
              style={{
                background: '#141A24',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
              <p className="text-xs uppercase tracking-widest font-semibold mb-3"
                style={{ color: 'rgba(255,255,255,0.3)' }}>
                Education
              </p>
              <h3 className="font-display font-bold text-base text-text-primary mb-3">
                {educationTitle}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {educationDetails}
              </p>
            </div>

            {/* Philosophy */}
            <div className="rounded-2xl p-7 card-hover"
              style={{
                background: '#141A24',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
              <p className="text-xs uppercase tracking-widest font-semibold mb-3"
                style={{ color: 'rgba(255,255,255,0.3)' }}>
                Teaching Philosophy
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                {philosophy}
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {aboutStats.map((stat: any) => (
                <div key={stat.label} className="rounded-xl p-4 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                  <p className="font-display font-extrabold text-xl"
                    style={{ color: '#F5A800' }}>
                    {stat.value}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

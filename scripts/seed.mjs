import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '262rmtge',
  dataset: 'production',
  apiVersion: '2026-05-15',
  token: process.env.SANITY_SEED_TOKEN,
  useCdn: false,
})

const doc = {
  _type: 'siteSettings',
  _id: 'siteSettings',

  heroBadge: 'Online & Onsite Academy',
  heroHeadline: 'Master Physics — <span class="text-gold">With Clarity,</span> <span class="text-blue-light">With Confidence</span>',
  heroDescription: 'Expert-led physics education by Irfan Haider — Associate Member of the Institute of Physics, UK. From fundamentals to advanced concepts, taught the way science was meant to be learned.',
  heroCtaPrimary: 'Explore Courses',
  heroCtaSecondary: 'Contact Us',
  heroBackgroundImage: 'https://images.unsplash.com/photo-1755167611440-3812d81aa757?w=1920&q=85',
  heroStats: [
    { _key: 'hs1', value: '9+', label: 'Years Teaching' },
    { _key: 'hs2', value: '3', label: "Int'l Memberships" },
    { _key: 'hs3', value: '2', label: 'Modes of Learning' },
  ],

  instructorName: 'Irfan Haider',
  instructorBio:
    'A dedicated physics educator with years of classroom experience and internationally recognised professional memberships.',
  aboutSectionLabel: 'About the Instructor',
  experience: [
    {
      _key: 'exp1',
      title: 'Physics Teacher',
      period: '2015 – 2021',
      institution: 'USWA Girls Public High School, Parachinar',
      current: false,
    },
    {
      _key: 'exp2',
      title: 'Visiting Lecturer',
      period: '2021 – Mar 2022',
      institution: 'University Model College, Parachinar',
      current: false,
    },
    {
      _key: 'exp3',
      title: 'Visiting Lecturer',
      period: 'Dec 2021 – Present',
      institution: 'Islamic Girls Public School & College, Parachinar',
      current: true,
    },
  ],
  affiliations: [
    { _key: 'aff1', name: 'Institute of Physics, UK', id: 'ID: 1158557' },
    { _key: 'aff2', name: 'American Physical Society', id: 'APS: 62069761' },
    { _key: 'aff3', name: 'Royal Microscopical Society', id: 'RMS13425' },
    { _key: 'aff4', name: 'Institution of Civil Engineers', id: 'MICE: 93603586' },
  ],
  educationTitle: 'BS (Hons) in Physics',
  educationDetails: 'Research Complex, Department of Physics, AIOU, Islamabad, Pakistan',
  philosophy:
    'Communicating science to society in a friendly, accessible environment — making physics not just a subject, but a way of understanding the world.',
  aboutStats: [
    { _key: 'as1', value: '9+', label: 'Years Teaching' },
    { _key: 'as2', value: '4', label: 'Institutions' },
    { _key: 'as3', value: '4', label: 'Intl. Memberships' },
  ],

  formats: [
    {
      _key: 'fmt1',
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
      _key: 'fmt2',
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
  ],

  email: 'irfan.haider48@outlook.com',
  phone: '+92 (0) 307 0003548',
  location: 'Parachinar, District Kurram, Pakistan',
  socialLinks: [
    { _key: 'sl1', platform: 'TikTok', url: 'https://www.tiktok.com/@physics.scout' },
    { _key: 'sl2', platform: 'Facebook', url: 'https://www.facebook.com/share/1J7aAipsN9/' },
    { _key: 'sl3', platform: 'YouTube', url: 'https://youtube.com/@physics-scout' },
  ],
  courseOptions: [
    'Foundation Physics (Matric/O-Level)',
    'Electromagnetism & Waves (FSc Part 2)',
    'Modern Physics (BSc/Advanced)',
    'Mathematical Physics (BSc)',
    'FSc / BSc Exam Preparation',
    'MDCAT Physics',
    'Science Communication',
    'Not sure yet',
  ],
  whatsappMessage: "Hello, I want to know about Physics Scout Academy",

  testimonialsSectionLabel: 'Student Reviews',
  testimonialsSectionHeading: 'What Students Say',
  testimonialsSectionDescription: 'Real feedback from students who have learned with Physics Scout Academy.',

  mcqSectionLabel: 'Daily Practice',
  mcqSectionHeading: "Today's MCQ",
  mcqSectionDescription: "Test your physics knowledge with today's challenge question.",
  mcqEmptyState: 'No question published today. Check back soon!',
  mcqSeeAllLink: 'See All MCQs →',

  copyrightText: 'Physics Scout Academy',
  footerTagline: 'Crafting better physics education',
}

const courses = [
  { title: 'Foundation Physics', level: 'Matric', mode: 'Both', isFree: false, fee: 2000, order: 1, description: 'Mechanics, thermodynamics, and optics for school-level learners. Build a solid conceptual base from the ground up.' },
  { title: 'Electromagnetism & Waves', level: 'FSc Part 2', mode: 'Both', isFree: false, fee: 2500, order: 2, description: 'From electric fields and circuits to wave optics — a comprehensive study of electromagnetic phenomena.' },
  { title: 'Modern Physics', level: 'BSc', mode: 'Online', isFree: false, fee: 3000, order: 3, description: 'Quantum mechanics, atomic structure, nuclear physics, and special relativity for advanced students.' },
  { title: 'Mathematical Physics', level: 'BSc', mode: 'Onsite', isFree: false, fee: 2500, order: 4, description: 'Vectors, calculus, and differential equations applied in physical contexts — the language of physics mastered.' },
  { title: 'FSc / BSc Exam Prep', level: 'FSc / BSc', mode: 'Both', isFree: false, fee: 2000, order: 5, description: 'Past paper drills, speed techniques, and exam strategy. Targeted preparation for board and university exams.' },
  { title: 'MDCAT Physics', level: 'MDCAT / Entry Test', mode: 'Both', isFree: false, fee: 3500, order: 6, description: 'MCQ-focused, concept-driven sessions covering the full MDCAT syllabus with timed practice tests.' },
  { title: 'Science Communication', level: 'All Levels', mode: 'Online', isFree: true, order: 7, description: 'Develop intuition for physics and the ability to explain real phenomena clearly and confidently.' },
]

const mcqs = [
  { question: 'A ball is thrown vertically upward. At its highest point, which of the following is true?', options: ['Velocity is zero, acceleration is zero', 'Velocity is zero, acceleration is downward', 'Velocity is maximum, acceleration is zero', 'Velocity is maximum, acceleration is downward'], correctAnswer: 1, topic: 'Mechanics', difficulty: 'Easy', explanation: 'At the highest point, the ball momentarily stops (v=0), but gravity still acts downward (g=9.8 m/s²).', publishedAt: '2026-06-01T00:00:00Z' },
  { question: 'The SI unit of electric charge is:', options: ['Ampere', 'Volt', 'Coulomb', 'Ohm'], correctAnswer: 2, topic: 'Electromagnetism', difficulty: 'Easy', explanation: 'The coulomb (C) is the SI unit of electric charge. One coulomb equals 6.242×10¹⁸ elementary charges.', publishedAt: '2026-06-02T00:00:00Z' },
  { question: 'Which law states that the entropy of a perfect crystal at absolute zero is exactly zero?', options: ['First Law of Thermodynamics', 'Second Law of Thermodynamics', 'Third Law of Thermodynamics', 'Zeroth Law of Thermodynamics'], correctAnswer: 2, topic: 'Thermodynamics', difficulty: 'Medium', explanation: 'The Third Law of Thermodynamics states that the entropy of a perfect crystal approaches zero as temperature approaches absolute zero.', publishedAt: '2026-06-03T00:00:00Z' },
  { question: 'In the photoelectric effect, the kinetic energy of emitted electrons depends on:', options: ['Intensity of light', 'Frequency of light', 'Both intensity and frequency', 'Wavelength of light only'], correctAnswer: 1, topic: 'Modern Physics', difficulty: 'Medium', explanation: 'The kinetic energy of photoelectrons depends on the frequency (ν) of incident light: KE = hν - φ. Intensity only affects the number of electrons.', publishedAt: '2026-06-04T00:00:00Z' },
  { question: 'The speed of light in vacuum is approximately:', options: ['3×10⁶ m/s', '3×10⁸ m/s', '3×10¹⁰ m/s', '3×10⁵ m/s'], correctAnswer: 1, topic: 'Waves & Optics', difficulty: 'Easy', explanation: 'The speed of light in a vacuum is 3×10⁸ m/s (approximately 300,000 km/s).', publishedAt: '2026-06-05T00:00:00Z' },
  { question: 'What is the divergence of the curl of any vector field?', options: ['Always zero', 'Always one', 'Equal to the Laplacian', 'Undefined'], correctAnswer: 0, topic: 'Mathematical Physics', difficulty: 'Hard', explanation: 'A fundamental vector calculus identity: ∇·(∇×F) = 0 for any sufficiently smooth vector field F.', publishedAt: '2026-06-06T00:00:00Z' },
  { question: 'A car rounds a banked curve at the design speed. The centripetal force is provided by:', options: ['Friction only', 'The normal force only', 'A component of the normal force', 'Gravity only'], correctAnswer: 2, topic: 'Mechanics', difficulty: 'Hard', explanation: 'On a banked curve at the design speed, the horizontal component of the normal force provides the centripetal force without needing friction.', publishedAt: '2026-06-07T00:00:00Z' },
  { question: 'Which of the following is NOT a vector quantity?', options: ['Velocity', 'Force', 'Temperature', 'Acceleration'], correctAnswer: 2, topic: 'Mechanics', difficulty: 'Easy', explanation: 'Temperature is a scalar quantity — it has magnitude only, no direction. Velocity, force, and acceleration are vectors.', publishedAt: '2026-06-08T00:00:00Z' },
  { question: 'The energy of a photon is directly proportional to its:', options: ['Wavelength', 'Frequency', 'Amplitude', 'Speed'], correctAnswer: 1, topic: 'Modern Physics', difficulty: 'Easy', explanation: 'E = hf, where h is Planck\'s constant and f is the frequency. Energy is proportional to frequency and inversely proportional to wavelength.', publishedAt: '2026-06-09T00:00:00Z' },
  { question: 'In an AC circuit, the power factor is defined as:', options: ['R/Z', 'Z/R', 'X/R', 'R/X'], correctAnswer: 0, topic: 'Electromagnetism', difficulty: 'Medium', explanation: 'Power factor = cos(φ) = R/Z, where R is resistance and Z is impedance. It represents the fraction of apparent power that is real power.', publishedAt: '2026-06-10T00:00:00Z' },
]

const testimonials = [
  { studentName: 'Ali Hassan', review: 'Physics Scout completely changed the way I look at physics. The conceptual clarity I gained is unmatched.', rating: 5, level: 'FSc Part 2', isApproved: true },
  { studentName: 'Fatima Noor', review: 'The best decision I made for my MDCAT preparation. Highly recommended!', rating: 5, level: 'MDCAT', isApproved: true },
  { studentName: 'Ahmed Raza', review: 'Online classes are very interactive and the recorded lectures help me revise anytime.', rating: 4, level: 'BSc', isApproved: true },
  { studentName: 'Zainab Ali', review: 'Small batch sizes ensure personal attention. I finally understand electromagnetism!', rating: 5, level: 'FSc Part 2', isApproved: true },
  { studentName: 'Usman Khan', review: 'Irfan sir explains complex topics in such a simple way. Grateful for this academy.', rating: 5, level: 'Matric', isApproved: true },
]

async function upsert(type, id, data) {
  const existing = await client.fetch(`*[_type == $type && _id == $id][0]._id`, { type, id })
  if (existing) {
    await client.patch(id).set(data).commit()
    console.log(`Updated ${type}: ${id}`)
  } else {
    await client.create({ _id: id, _type: type, ...data })
    console.log(`Created ${type}: ${id}`)
  }
}

async function main() {
  await upsert('siteSettings', 'siteSettings', doc)

  function safeId(prefix, title) {
    return `${prefix}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
  }

  for (const c of courses) {
    const id = safeId('course', c.title)
    await upsert('course', id, c)
  }

  for (const t of testimonials) {
    const id = safeId('testimonial', t.studentName)
    await upsert('testimonial', id, t)
  }

  for (const m of mcqs) {
    const id = safeId('mcq', m.question.slice(0, 40))
    await upsert('mcq', id, m)
  }

  console.log('Seeding complete.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

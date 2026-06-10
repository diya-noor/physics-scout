import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Courses from './components/Courses'
import Format from './components/Format'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AnnouncementBanner from './components/AnnouncementBanner'
import DailyMCQSection from './components/DailyMCQSection'
import TestimonialsSection from './components/TestimonialsSection'
import WhatsAppButton from './components/WhatsAppButton'
import { getActiveAnnouncement, getTodayMCQ, getTestimonials, getSiteSettings } from '@/sanity/lib/queries'

export const revalidate = 60

export default async function Home() {
  const [announcement, todayMCQ, testimonials, settings] = await Promise.all([
    getActiveAnnouncement(),
    getTodayMCQ(),
    getTestimonials(),
    getSiteSettings(),
  ])
  const s = settings as any || {}

  return (
    <>
      {announcement && (
        <AnnouncementBanner
          text={(announcement as any).text}
          link={(announcement as any).link}
          type={(announcement as any).type}
        />
      )}
      <main>
        <Navbar navLinks={s.navLinks} ctaText={s.ctaText} />
        <Hero
          badge={s.heroBadge}
          headline={s.heroHeadline}
          description={s.heroDescription}
          ctaPrimary={s.heroCtaPrimary}
          ctaSecondary={s.heroCtaSecondary}
          backgroundImage={s.heroBackgroundImage}
          stats={s.heroStats}
        />
        <About
          instructorName={s.instructorName}
          instructorBio={s.instructorBio}
          aboutSectionLabel={s.aboutSectionLabel}
          experience={s.experience}
          affiliations={s.affiliations}
          educationTitle={s.educationTitle}
          educationDetails={s.educationDetails}
          philosophy={s.philosophy}
          aboutStats={s.aboutStats}
        />
        <Courses />
        <Format formats={s.formats} />
        <DailyMCQSection
          mcq={todayMCQ as any}
          sectionLabel={s.mcqSectionLabel}
          sectionHeading={s.mcqSectionHeading}
          sectionDescription={s.mcqSectionDescription}
          emptyState={s.mcqEmptyState}
          seeAllLink={s.mcqSeeAllLink}
        />
        <TestimonialsSection
          testimonials={(testimonials as any[]) ?? []}
          sectionLabel={s.testimonialsSectionLabel}
          sectionHeading={s.testimonialsSectionHeading}
          sectionDescription={s.testimonialsSectionDescription}
        />
        <Contact
          email={s.email}
          phone={s.phone}
          location={s.location}
          socialLinks={s.socialLinks}
          courseOptions={s.courseOptions}
        />
        <Footer
          copyrightText={s.copyrightText}
          footerTagline={s.footerTagline}
          socialLinks={s.socialLinks}
        />
      </main>
      <WhatsAppButton phone={s.phone} message={s.whatsappMessage} />
    </>
  )
}

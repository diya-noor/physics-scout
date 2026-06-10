import { client } from './client'

function safeQuery<T>(query: string, params: Record<string, any> | null, fallback: T): Promise<T> {
  return client.fetch<T>(query, params ?? {}).catch(() => fallback)
}

export async function getTodayMCQ() {
  return safeQuery(`
    *[_type == "mcq"] | order(publishedAt desc)[0] {
      _id, question, options, correctAnswer, topic, difficulty, explanation, publishedAt
    }
  `, null, null)
}

export async function getAllMCQs() {
  return safeQuery(`
    *[_type == "mcq"] | order(publishedAt desc) {
      _id, question, options, correctAnswer, topic, difficulty, publishedAt
    }
  `, null, [] as any[])
}

export async function getCourses() {
  return safeQuery(`
    *[_type == "course"] | order(order asc) {
      _id, title, description, level, mode, youtubeUrl, isFree, fee,
      "pdfUrl": pdf.asset->url,
      "thumbnailUrl": thumbnail.asset->url,
      chapters[]->{ _id, title, order }
    }
  `, null, [] as any[])
}

export async function getCourseBySlug(slug: string) {
  return safeQuery(`
    *[_type == "course" && slug.current == $slug][0] {
      _id, title, description, content, level, mode, youtubeUrl, isFree, fee,
      "pdfUrl": pdf.asset->url,
      "thumbnailUrl": thumbnail.asset->url,
      chapters[]->{ _id, title, order, content, "pdfUrl": pdf.asset->url, youtubeUrl } | order(order asc)
    }
  `, { slug }, null)
}

export async function getCourseById(id: string) {
  return safeQuery(`
    *[_type == "course" && _id == $id][0] {
      _id, title, description, content, level, mode, youtubeUrl, isFree, fee,
      "pdfUrl": pdf.asset->url,
      "thumbnailUrl": thumbnail.asset->url,
      chapters[]->{ _id, title, order } | order(order asc)
    }
  `, { id }, null)
}

export async function getChapter(id: string) {
  return safeQuery(`
    *[_type == "chapter" && _id == $id][0] {
      _id, title, order, content,
      "pdfUrl": pdf.asset->url,
      youtubeUrl,
      course->{ _id, title }
    }
  `, { id }, null)
}

export async function getChaptersByCourse(courseId: string) {
  return safeQuery(`
    *[_type == "chapter" && course._ref == $courseId] | order(order asc) {
      _id, title, order,
      "pdfUrl": pdf.asset->url,
      youtubeUrl
    }
  `, { courseId }, [] as any[])
}

export async function getQuiz(id: string) {
  return safeQuery(`
    *[_type == "quiz" && _id == $id][0] {
      _id, title, description,
      course->{ _id, title },
      chapter->{ _id, title },
      questions[]->{ _id, question, options, correctAnswer, difficulty, topic, explanation },
      publishedAt
    }
  `, { id }, null)
}

export async function getMCQsByChapter(chapterId: string) {
  return safeQuery(`
    *[_type == "mcq" && chapter._ref == $chapterId] {
      _id, question, options, correctAnswer, topic, difficulty, explanation, publishedAt
    }
  `, { chapterId }, [] as any[])
}

export async function getSiteSettings() {
  return safeQuery(`
    *[_type == "siteSettings" && _id == "siteSettings"][0] {
      heroBadge, heroHeadline, heroDescription, heroCtaPrimary, heroCtaSecondary,
      heroBackgroundImage, heroStats,
      instructorName, instructorBio, aboutSectionLabel,
      experience, affiliations, educationTitle, educationDetails, philosophy, aboutStats,
      formats,
      email, phone, location, socialLinks, courseOptions, whatsappMessage,
      testimonialsSectionLabel, testimonialsSectionHeading, testimonialsSectionDescription,
      mcqSectionLabel, mcqSectionHeading, mcqSectionDescription, mcqEmptyState, mcqSeeAllLink,
      copyrightText, footerTagline
    }
  `, null, null)
}

export async function getActiveAnnouncement() {
  return safeQuery(`
    *[_type == "announcement" && isActive == true][0] { text, link, type }
  `, null, null)
}

export async function getTestimonials() {
  return safeQuery(`
    *[_type == "testimonial" && isApproved == true] {
      studentName, review, rating, level
    }
  `, null, [] as any[])
}

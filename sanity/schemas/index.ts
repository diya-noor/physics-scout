import { mcqSchema } from './mcq'
import { courseSchema } from './course'
import { chapterSchema } from './chapter'
import { quizSchema } from './quiz'
import { announcementSchema } from './announcement'
import { testimonialSchema } from './testimonial'
import { siteSettingsSchema } from './siteSettings'

export const schemaTypes = [siteSettingsSchema, mcqSchema, courseSchema, chapterSchema, quizSchema, announcementSchema, testimonialSchema]

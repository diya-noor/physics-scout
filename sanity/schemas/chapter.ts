import { defineType, defineField } from 'sanity'

export const chapterSchema = defineType({
  name: 'chapter',
  title: 'Chapter',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Chapter Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{ type: 'course' }],
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
    defineField({
      name: 'content',
      title: 'Chapter Material',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      description: 'Rich text theory, equations, and diagrams for this chapter',
    }),
    defineField({
      name: 'pdf',
      title: 'Chapter PDF Notes',
      type: 'file',
      options: { accept: '.pdf' },
      description: 'Upload a PDF version of the chapter notes',
    }),
    defineField({ name: 'youtubeUrl', title: 'YouTube Lecture URL', type: 'url' }),
  ],
  orderings: [
    {
      title: 'Course / Order',
      name: 'courseOrder',
      by: [{ field: 'course', direction: 'asc' }, { field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', courseTitle: 'course.title', order: 'order' },
    prepare({ title, courseTitle, order }) {
      return { title, subtitle: courseTitle ? `${courseTitle} — Ch. ${order ?? '?'}` : `Ch. ${order ?? '?'}` }
    },
  },
})

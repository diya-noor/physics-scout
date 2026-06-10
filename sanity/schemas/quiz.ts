import { defineType, defineField } from 'sanity'

export const quizSchema = defineType({
  name: 'quiz',
  title: 'Quiz',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Quiz Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{ type: 'course' }],
      description: 'Course this quiz belongs to',
    }),
    defineField({
      name: 'chapter',
      title: 'Chapter',
      type: 'reference',
      to: [{ type: 'chapter' }],
      description: 'Chapter this quiz tests (optional)',
    }),
    defineField({
      name: 'questions',
      title: 'MCQ Questions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'mcq' }] }],
      validation: Rule => Rule.min(1),
    }),
    defineField({ name: 'publishedAt', title: 'Publish Date', type: 'datetime', initialValue: () => new Date().toISOString() }),
  ],
  orderings: [{ title: 'Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', chapterTitle: 'chapter.title', questionCount: 'questions.length' },
    prepare({ title, chapterTitle, questionCount }) {
      return { title, subtitle: `${chapterTitle ?? 'No chapter'} — ${questionCount ?? 0} questions` }
    },
  },
})

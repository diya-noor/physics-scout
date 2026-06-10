import { defineType, defineField } from 'sanity'

export const mcqSchema = defineType({
  name: 'mcq',
  title: 'Daily MCQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'text', validation: Rule => Rule.required() }),
    defineField({ name: 'options', title: 'Options (exactly 4)', type: 'array', of: [{ type: 'string' }], validation: Rule => Rule.min(4).max(4).required() }),
    defineField({ name: 'correctAnswer', title: 'Correct Answer Index (0–3)', type: 'number', validation: Rule => Rule.min(0).max(3).required() }),
    defineField({
      name: 'topic', title: 'Topic', type: 'string',
      options: { list: ['Mechanics','Thermodynamics','Electromagnetism','Waves & Optics','Modern Physics','Mathematical Physics'] }
    }),
    defineField({
      name: 'chapter',
      title: 'Related Chapter',
      type: 'reference',
      to: [{ type: 'chapter' }],
      description: 'Link this MCQ to a specific chapter (optional)',
    }),
    defineField({
      name: 'difficulty', title: 'Difficulty Level', type: 'string',
      options: { list: [{ title: 'Easy', value: 'Easy' }, { title: 'Medium', value: 'Medium' }, { title: 'Hard', value: 'Hard' }] }
    }),
    defineField({ name: 'explanation', title: 'Answer Explanation', type: 'text' }),
    defineField({ name: 'publishedAt', title: 'Publish Date', type: 'datetime', initialValue: () => new Date().toISOString() }),
  ],
  orderings: [{ title: 'Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
})

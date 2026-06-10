import { defineType, defineField } from 'sanity'

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'studentName', title: 'Student Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'review', title: 'Review', type: 'text', validation: Rule => Rule.required() }),
    defineField({ name: 'rating', title: 'Rating (1–5)', type: 'number', validation: Rule => Rule.min(1).max(5).required() }),
    defineField({ name: 'level', title: 'Student Class Level', type: 'string' }),
    defineField({ name: 'isApproved', title: 'Approved to show on website?', type: 'boolean', initialValue: false }),
  ],
})

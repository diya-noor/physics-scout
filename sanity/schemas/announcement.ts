import { defineType, defineField } from 'sanity'

export const announcementSchema = defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({ name: 'text', title: 'Announcement Text', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'isActive', title: 'Show on Website?', type: 'boolean', initialValue: true }),
    defineField({ name: 'link', title: 'Optional Link', type: 'url' }),
    defineField({
      name: 'type', title: 'Type', type: 'string',
      options: { list: [{ title: 'Info', value: 'info' }, { title: 'New Batch', value: 'batch' }, { title: 'Exam Alert', value: 'exam' }] },
      initialValue: 'info',
    }),
  ],
})

import { defineType, defineField } from 'sanity'

export const courseSchema = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Course Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'content',
      title: 'Course Material (Rich Text)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      description: 'Write the full course material here as rich text',
    }),
    defineField({ name: 'level', title: 'Class Level', type: 'string', options: { list: ['Matric','FSc Part 1','FSc Part 2','BSc','All Levels'] } }),
    defineField({ name: 'mode', title: 'Mode', type: 'string', options: { list: [{ title: 'Online', value: 'Online' }, { title: 'Onsite', value: 'Onsite' }, { title: 'Both', value: 'Both' }] } }),
    defineField({ name: 'youtubeUrl', title: 'YouTube Playlist / Video URL', type: 'url' }),
    defineField({ name: 'pdf', title: 'Notes PDF Upload', type: 'file', options: { accept: '.pdf' } }),
    defineField({ name: 'thumbnail', title: 'Course Thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'isFree', title: 'Free Course?', type: 'boolean', initialValue: true }),
    defineField({ name: 'fee', title: 'Fee (PKR)', type: 'number', hidden: ({ document }) => (document as any)?.isFree === true }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
    defineField({
      name: 'chapters',
      title: 'Chapters',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'chapter' }] }],
      description: 'Organize course into chapters',
    }),
  ],
})

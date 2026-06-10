import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'about', title: 'About' },
    { name: 'format', title: 'Format' },
    { name: 'contact', title: 'Contact' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'dailyMcq', title: 'Daily MCQ' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    /* ───── HERO ───── */
    defineField({ name: 'heroBadge', title: 'Hero Badge Text', type: 'string', group: 'hero' }),
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', group: 'hero', description: 'Main headline with HTML support for spans' }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text', group: 'hero' }),
    defineField({ name: 'heroCtaPrimary', title: 'Primary CTA Button', type: 'string', group: 'hero' }),
    defineField({ name: 'heroCtaSecondary', title: 'Secondary CTA Button', type: 'string', group: 'hero' }),
    defineField({ name: 'heroBackgroundImage', title: 'Background Image URL', type: 'url', group: 'hero' }),
    defineField({
      name: 'heroStats', title: 'Hero Stats', type: 'array', group: 'hero',
      of: [{ type: 'object', fields: [
        { type: 'string', name: 'value', title: 'Value' },
        { type: 'string', name: 'label', title: 'Label' },
      ] }],
    }),

    /* ───── ABOUT ───── */
    defineField({ name: 'instructorName', title: 'Instructor Name', type: 'string', group: 'about' }),
    defineField({ name: 'instructorBio', title: 'Instructor Bio', type: 'text', group: 'about' }),
    defineField({ name: 'aboutSectionLabel', title: 'Section Label', type: 'string', group: 'about', initialValue: 'About the Instructor' }),
    defineField({
      name: 'experience', title: 'Experience Timeline', type: 'array', group: 'about',
      of: [{ type: 'object', fields: [
        { type: 'string', name: 'title', title: 'Title' },
        { type: 'string', name: 'period', title: 'Period' },
        { type: 'string', name: 'institution', title: 'Institution' },
        { type: 'boolean', name: 'current', title: 'Current Position?' },
      ] }],
    }),
    defineField({
      name: 'affiliations', title: 'Professional Affiliations', type: 'array', group: 'about',
      of: [{ type: 'object', fields: [
        { type: 'string', name: 'name', title: 'Name' },
        { type: 'string', name: 'id', title: 'ID / Membership' },
      ] }],
    }),
    defineField({ name: 'educationTitle', title: 'Education Title', type: 'string', group: 'about' }),
    defineField({ name: 'educationDetails', title: 'Education Details', type: 'text', group: 'about' }),
    defineField({ name: 'philosophy', title: 'Teaching Philosophy', type: 'text', group: 'about' }),
    defineField({
      name: 'aboutStats', title: 'About Stats', type: 'array', group: 'about',
      of: [{ type: 'object', fields: [
        { type: 'string', name: 'value', title: 'Value' },
        { type: 'string', name: 'label', title: 'Label' },
      ] }],
    }),

    /* ───── FORMAT ───── */
    defineField({
      name: 'formats', title: 'Learning Formats', type: 'array', group: 'format',
      of: [{ type: 'object', fields: [
        { type: 'string', name: 'title', title: 'Title' },
        { type: 'string', name: 'tagline', title: 'Tagline' },
        { type: 'string', name: 'accent', title: 'Accent Color (hex)' },
        { type: 'array', name: 'bullets', title: 'Bullet Points', of: [{ type: 'string' }] },
      ] }],
    }),

    /* ───── CONTACT ───── */
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contact' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', group: 'contact' }),
    defineField({ name: 'location', title: 'Location', type: 'string', group: 'contact' }),
    defineField({
      name: 'socialLinks', title: 'Social Links', type: 'array', group: 'contact',
      of: [{ type: 'object', fields: [
        { type: 'string', name: 'platform', title: 'Platform' },
        { type: 'url', name: 'url', title: 'URL' },
      ] }],
    }),
    defineField({
      name: 'courseOptions', title: 'Enrollment Course Options', type: 'array', group: 'contact',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'whatsappMessage', title: 'WhatsApp Pre-filled Message', type: 'string', group: 'contact' }),

    /* ───── TESTIMONIALS ───── */
    defineField({ name: 'testimonialsSectionLabel', title: 'Section Label', type: 'string', group: 'testimonials', initialValue: 'Student Reviews' }),
    defineField({ name: 'testimonialsSectionHeading', title: 'Section Heading', type: 'string', group: 'testimonials', initialValue: 'What Students Say' }),
    defineField({ name: 'testimonialsSectionDescription', title: 'Section Description', type: 'text', group: 'testimonials' }),

    /* ───── DAILY MCQ ───── */
    defineField({ name: 'mcqSectionLabel', title: 'Section Label', type: 'string', group: 'dailyMcq', initialValue: 'Daily Practice' }),
    defineField({ name: 'mcqSectionHeading', title: 'Section Heading', type: 'string', group: 'dailyMcq', initialValue: "Today's MCQ" }),
    defineField({ name: 'mcqSectionDescription', title: 'Section Description', type: 'text', group: 'dailyMcq' }),
    defineField({ name: 'mcqEmptyState', title: 'Empty State Message', type: 'string', group: 'dailyMcq' }),
    defineField({ name: 'mcqSeeAllLink', title: 'See All Link Text', type: 'string', group: 'dailyMcq', initialValue: 'See All MCQs →' }),

    /* ───── FOOTER ───── */
    defineField({ name: 'copyrightText', title: 'Copyright Text', type: 'string', group: 'footer' }),
    defineField({ name: 'footerTagline', title: 'Footer Tagline', type: 'string', group: 'footer' }),
  ],
  preview: {
    prepare() { return { title: 'Site Settings' } },
  },
})

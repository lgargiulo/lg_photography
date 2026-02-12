import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Main image shown at the top of the About page',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      description: 'e.g., "Hey, I\'m Luca"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'introText',
      title: 'Introduction',
      type: 'text',
      rows: 3,
      description: 'The main introduction paragraph',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'storyParagraphs',
      title: 'Personal Story',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Paragraph Text',
              type: 'text',
              rows: 4,
            },
          ],
          preview: {
            select: {
              text: 'text',
            },
            prepare({ text }) {
              return {
                title: text?.substring(0, 100) + '...',
              };
            },
          },
        },
      ],
      description: 'Additional paragraphs telling your story',
    }),
    defineField({
      name: 'approachHeading',
      title: 'Approach Section Heading',
      type: 'string',
      description: 'e.g., "My Approach"',
      initialValue: 'My Approach',
    }),
    defineField({
      name: 'approachTagline',
      title: 'Approach Tagline',
      type: 'text',
      rows: 2,
      description: 'Short description under the approach heading',
    }),
    defineField({
      name: 'approachDescription',
      title: 'Approach Description',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Paragraph Text',
              type: 'text',
              rows: 4,
            },
          ],
          preview: {
            select: {
              text: 'text',
            },
            prepare({ text }) {
              return {
                title: text?.substring(0, 100) + '...',
              };
            },
          },
        },
      ],
      description: 'Paragraphs describing your approach to photography',
    }),
    defineField({
      name: 'values',
      title: 'Core Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Value Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              description: 'description',
            },
            prepare({ title, description }) {
              return {
                title,
                subtitle: description,
              };
            },
          },
        },
      ],
      description: 'Your core values (e.g., Authenticity, Excellence, Partnership)',
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About Page Content',
      };
    },
  },
});

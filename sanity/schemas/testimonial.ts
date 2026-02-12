import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role/Title',
      type: 'string',
      description: 'e.g., "Artist Manager", "Celebrations Couple", "Event Organizer"',
    }),
    defineField({
      name: 'company',
      title: 'Company/Organization',
      type: 'string',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          { title: 'Events & Music', value: 'events' },
          { title: 'Artist Press Shots', value: 'artists' },
          { title: 'Venue Photography', value: 'venues' },
          { title: 'Celebrations & Portraits', value: 'celebrations' },
          { title: 'General', value: 'general' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      media: 'avatar',
    },
  },
});

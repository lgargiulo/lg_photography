import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'FAQs',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Booking', value: 'booking' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'Delivery', value: 'delivery' },
          { title: 'Technical', value: 'technical' },
        ],
      },
      initialValue: 'general',
    }),
    defineField({
      name: 'page',
      title: 'Show On Page',
      type: 'string',
      description: 'Which page should this FAQ appear on?',
      options: {
        list: [
          { title: 'Services Page', value: 'services' },
          { title: 'Contact Page', value: 'contact' },
          { title: 'Both Pages', value: 'both' },
        ],
      },
      initialValue: 'both',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category',
      order: 'order',
    },
    prepare({ title, category, order }) {
      return {
        title,
        subtitle: `${category} • Order: ${order}`,
      };
    },
  },
});

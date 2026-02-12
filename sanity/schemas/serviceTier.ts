import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'serviceTier',
  title: 'Service Tiers',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tier Name',
      type: 'string',
      description: 'e.g., "The Capture", "The Identity", "The Launchpad"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short tagline shown under the tier name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g., "€200" or "From €500"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of features included in this tier',
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: 'ctaText',
      title: 'Button Text',
      type: 'string',
      description: 'Text for the call-to-action button',
      initialValue: 'Get Started',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Tier',
      type: 'boolean',
      description: 'Mark as "Most Popular" and display larger',
      initialValue: false,
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'Optional badge text (e.g., "Budget Pick")',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.required().min(0),
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
      title: 'name',
      price: 'price',
      featured: 'isFeatured',
      order: 'order',
    },
    prepare({ title, price, featured, order }) {
      return {
        title,
        subtitle: `${price}${featured ? ' • Featured' : ''} • Order: ${order}`,
      };
    },
  },
});

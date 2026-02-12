import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'hero', title: 'Hero Section' },
    { name: 'approach', title: 'Approach Section' },
    { name: 'about', title: 'About - Where I Live' },
    { name: 'contact', title: 'Contact Info' },
    { name: 'footer', title: 'Footer' },
    { name: 'social', title: 'Social Media' },
  ],
  fields: [
    // General Settings
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'general',
      description: 'e.g., "Luca Gargiulo Photography"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
      description: 'Your photography logo',
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
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      group: 'general',
      description: 'Used for SEO meta description',
    }),

    // Hero Section
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      group: 'hero',
      description: 'Main heading on homepage',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      group: 'hero',
      description: 'Subheading on homepage',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroImages',
      title: 'Hero Background Images',
      type: 'array',
      group: 'hero',
      description: 'Multiple images for hero carousel. Upload a separate vertical image for mobile if needed.',
      of: [
        {
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
            {
              name: 'mobileImage',
              title: 'Mobile Image (Vertical)',
              type: 'image',
              description: 'Optional vertical image shown on mobile instead of the desktop one',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Homepage Stats',
      type: 'object',
      group: 'hero',
      fields: [
        {
          name: 'eventsShot',
          title: 'Events Shot',
          type: 'number',
        },
        {
          name: 'artistsWorkedWith',
          title: 'Artists Worked With',
          type: 'number',
        },
        {
          name: 'yearsExperience',
          title: 'Years of Experience',
          type: 'number',
        },
        {
          name: 'happyClients',
          title: 'Happy Clients',
          type: 'number',
        },
      ],
    }),

    // Approach Section
    defineField({
      name: 'approachConcertImage',
      title: 'Concert Image',
      type: 'image',
      group: 'approach',
      description: 'Large concert/music image for "My Approach" section (horizontal rectangle)',
      options: {
        hotspot: true,
        accept: 'image/*'
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
      name: 'approachWeddingImage',
      title: 'Celebrations Image',
      type: 'image',
      group: 'approach',
      description: 'Celebrations image for "My Approach" section (small square)',
      options: {
        hotspot: true,
        accept: 'image/*'
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
      name: 'approachEditorialImage',
      title: 'Editorial/Portrait Image',
      type: 'image',
      group: 'approach',
      description: 'Editorial or portrait image for "My Approach" section (small square)',
      options: {
        hotspot: true,
        accept: 'image/*'
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

    // About - Where I Live Section
    defineField({
      name: 'whereILiveImages',
      title: 'County Cork Images',
      type: 'array',
      group: 'about',
      description: 'Photos of County Cork to showcase where you live',
      of: [
        {
          type: 'image',
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
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'whereITravelImages',
      title: 'Travel Photos',
      type: 'array',
      group: 'about',
      description: 'Photos from your travels around the world',
      of: [
        {
          type: 'image',
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
            {
              name: 'location',
              title: 'Location',
              type: 'string',
              description: 'City/Country (e.g., "Prague, Czech Republic")',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),

    // Contact Info
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'contact',
      description: 'e.g., "Cork, Ireland"',
    }),

    // Footer
    defineField({
      name: 'footerServices',
      title: 'Footer Services Links',
      type: 'array',
      group: 'footer',
      description: 'Services shown in footer navigation',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Link Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'href',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'footerCompany',
      title: 'Footer Company Links',
      type: 'array',
      group: 'footer',
      description: 'Company links in footer (About, Contact)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Link Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'href',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'footerLegal',
      title: 'Footer Legal Links',
      type: 'array',
      group: 'footer',
      description: 'Legal links in footer (Privacy, Terms)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Link Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'href',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      group: 'footer',
      description: 'e.g., "Luca Gargiulo Photography"',
    }),
    defineField({
      name: 'designerCredit',
      title: 'Designer Credit',
      type: 'string',
      group: 'footer',
      description: 'e.g., "Designed by Luca Gargiulo"',
    }),

    // Social Media
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      group: 'social',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});

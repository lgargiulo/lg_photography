import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: '1k4vjjoe',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Set to false if you want fresh data
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

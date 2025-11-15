import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const posts = defineCollection({
  loader: glob({ pattern: 'posts/**/*.{md,mdx}' }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    created: z.date(),
  }),
})

export const collections = { posts }

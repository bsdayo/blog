import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import icon from 'astro-icon'
import mdx from '@astrojs/mdx'
import tailwindcss from '@tailwindcss/vite'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import siteConfig from './src/site.config'

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,
  integrations: [react(), icon(), mdx()],
  markdown: {
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    shikiConfig: {
      themes: siteConfig.shikiThemes,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})

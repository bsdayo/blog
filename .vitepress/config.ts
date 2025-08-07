import { defineConfig } from 'vitepress'
// @ts-expect-error
import implictFigures from 'markdown-it-implicit-figures'

export default defineConfig({
  title: "bsdayo's blog",
  description: "bsdayo's blog",
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  ignoreDeadLinks: 'localhostLinks',

  markdown: {
    theme: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-mocha',
    },
    math: true,
    config(md) {
      md.use(implictFigures, {
        figcaption: true,
        keepAlt: true,
      })
    },
  },

  transformPageData(page) {
    page.title = page.frontmatter.title || page.params?.title || page.title
  },

  vite: {
    configFile: 'vite.config.ts',
  },
})

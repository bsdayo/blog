import { defineConfig } from 'vitepress'

export default defineConfig({
  // Site
  title: "bsdayo's blog",
  description: "bsdayo's blog",
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],

  // Markdown
  markdown: {
    theme: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-mocha',
    },
    math: true,
  },

  // Build
  srcDir: 'content',
  vite: {
    configFile: 'vite.config.ts',
  },
})

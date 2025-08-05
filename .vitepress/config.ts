import { defineConfig } from 'vitepress'
import type { ThemeConfig } from './types'

export default defineConfig<ThemeConfig>({
  title: "bsdayo's blog",
  description: "bsdayo's blog",
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],

  markdown: {
    theme: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-mocha',
    },
    math: true,
  },

  vite: {
    configFile: 'vite.config.ts',
  },
})

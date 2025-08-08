import { defineConfig } from 'vitepress'
// @ts-expect-error
import implictFigures from 'markdown-it-implicit-figures'
import { ThemeConfig } from './theme'

export default defineConfig<ThemeConfig>({
  title: "bsdayo's blog",
  description: "bsdayo's blog",
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/favicon.png' }]],
  ignoreDeadLinks: 'localhostLinks',
  cleanUrls: true,

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

  themeConfig: {
    giscus: {
      host: 'https://giscus.app',
      repo: 'bsdayo/blog',
      repoId: 'R_kgDOPaDfsw',
      category: 'Comments',
      categoryId: 'DIC_kwDOPaDfs84Ct5zR',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '0',
      emitMetadata: '0',
      inputPosition: 'top',
      lang: 'zh-CN',
      loading: 'lazy',
    },
  },

  transformPageData(page) {
    page.title = page.frontmatter.title || page.params?.title || page.title
  },
  rewrites(id) {
    if (id.startsWith('posts/')) {
      const parts = id.split('/')
      if (parts.length > 2) {
        return `posts/${parts[parts.length - 2]}/index.md`
      }
    }
    return id
  },

  vite: {
    configFile: 'vite.config.ts',
  },
})

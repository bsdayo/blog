import type { ShikiConfig } from 'astro'
import type { GiscusProps } from '@giscus/react'

export default {
  title: "bsdayo's blog",
  site: 'https://bsdayo.moe',
  backend: import.meta.env.DEV ? 'ws://localhost:8123' : 'wss://blog-backend.bsdayo.moe',
  shikiThemes: {
    light: 'catppuccin-latte',
    dark: 'catppuccin-mocha',
  } satisfies ShikiConfig['themes'],
  giscus: {
    host: 'https://giscus.app',
    repo: 'bsdayo/blog',
    repoId: 'R_kgDOQBXNQQ',
    category: 'Comments',
    categoryId: 'DIC_kwDOQBXNQc4Cws5F',
    mapping: 'pathname',
    strict: '0',
    reactionsEnabled: '0',
    emitMetadata: '0',
    inputPosition: 'top',
    theme: 'preferred_color_scheme',
    lang: 'zh-CN',
    loading: 'lazy',
  } satisfies GiscusProps,
}

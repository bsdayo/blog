import type { ShikiConfig } from 'astro'

export default {
  title: "bsdayo's blog",
  site: 'https://bsdayo.moe',
  backend: import.meta.env.DEV ? 'ws://localhost:8123' : 'wss://blog-backend.bsdayo.moe',
  shikiThemes: {
    light: 'catppuccin-latte',
    dark: 'catppuccin-mocha',
  } satisfies ShikiConfig['themes'],
}

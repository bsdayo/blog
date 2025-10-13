import type { ShikiConfig } from 'astro'

export default {
  site: 'https://bsdayo.moe',
  shikiThemes: {
    light: 'catppuccin-latte',
    dark: 'catppuccin-mocha',
  } satisfies ShikiConfig['themes'],
}

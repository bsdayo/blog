import {
  defineConfig,
  presetWind4,
  presetTypography,
  presetWebFonts,
  presetIcons,
  transformerDirectives,
} from 'unocss'
import type { Preset, PresetWind4Theme } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetTypography() as Preset<PresetWind4Theme>,
    presetWebFonts({
      provider: 'fontsource',
      fonts: {
        sans: 'Inter',
        mono: 'Maple Mono',
      },
    }),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'text-bottom',
      },
    }),
  ],
  transformers: [transformerDirectives()],
  shortcuts: {
    'bg-body': 'bg-white dark:bg-zinc-900',
    'text-body': 'text-zinc-700 dark:text-zinc-200',
    'text-link': 'text-zinc-900 dark:text-zinc-100',
    'text-caption': 'text-zinc-500 dark:text-zinc-400',
    'text-hoverable': 'opacity-60 hover:opacity-100 transition-opacity',
  },
})

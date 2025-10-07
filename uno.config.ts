import {
  defineConfig,
  presetWind4,
  presetTypography,
  presetWebFonts,
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import type { Preset, PresetWind4Theme } from 'unocss'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineConfig<PresetWind4Theme>({
  presets: [
    presetWind4(),
    presetTypography() as Preset<PresetWind4Theme>,
    presetWebFonts({
      provider: 'fontsource',
      fonts: {
        sans: [
          'Inter',
          {
            name: 'Inter',
            italic: true,
          },
        ],
        mono: [
          'Maple Mono',
          {
            name: 'Maple Mono',
            italic: true,
          },
        ],
      },
    }),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'text-bottom',
      },
      collections: {
        custom: FileSystemIconLoader('./assets/icons'),
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  rules: [
    [
      'shiki-light',
      {
        color: 'var(--shiki-light)',
        'background-color': 'var(--shiki-light-bg)',
        'font-style': 'var(--shiki-light-font-style)',
        'font-weight': 'var(--shiki-light-font-weight)',
        'text-decoration': 'var(--shiki-light-text-decoration)',
      },
    ],
    [
      'shiki-dark',
      {
        color: 'var(--shiki-dark)',
        'background-color': 'var(--shiki-dark-bg)',
        'font-style': 'var(--shiki-dark-font-style)',
        'font-weight': 'var(--shiki-dark-font-weight)',
        'text-decoration': 'var(--shiki-dark-text-decoration)',
      },
    ],
  ],
  shortcuts: {
    hoverable: 'transition-opacity opacity-60 hover:opacity-100',

    'text-caption': 'text-zinc-500 dark:text-zinc-400',

    'text-link':
      'no-underline transition-colors border-b-px border-[color-mix(in_srgb,currentColor_30%,transparent)]',

    'border-body': 'text-zinc-700 dark:text-zinc-200',

    // Glasses
    'bg-glass': 'bg-white/80 dark:bg-zinc-900/80',
    'backdrop-glass': 'backdrop-blur-20px backdrop-saturate-180%',
    'backdrop-glass-edge':
      'backdrop-blur-10px bg-[hsl(0deg_0%_100%/0.1)] backdrop-saturate-180% backdrop-brightness-90% dark:backdrop-brightness-110%',
  },
})

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
import clsx from 'clsx'

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

    typography: clsx(
      // General
      'prose dark:prose-invert prose-zinc',
      '[&_a.header-anchor]:(absolute -left-1em border-none opacity-0 transition-opacity font-normal) before:[&_a.header-anchor]:content-["#"] [&_a.header-anchor]:hover:prose-headings:opacity-80',
      '[&_a.header-anchor]:prose-h1:hidden',
      'prose-a:text-link hover:prose-a:border-current',
      'before:[&_:not(pre)>code]:hidden after:[&_:not(pre)>code]:hidden [&_:not(pre)>code]:(bg-zinc-500/10 px-6px py-3px rounded)',
      '[&_li>ul]:m-0',
      // Images
      'prose-figure:(w-full flex flex-col items-center) prose-figcaption:(text-center mt-2)',
      // Code blocks
      'prose-pre:rounded-lg',
      '[&_div[class*=language-]]:relative',
      '[&_div[class*=language-]>button.copy]:(absolute top-4 right-4 size-4 i-lucide-copy opacity-0 transition-opacity)',
      '[&_div[class*=language-]:hover>button.copy]:(opacity-100 cursor-pointer)',
      '[&_div[class*=language-]>button.copy.copied]:i-lucide-check',
      '[&_div[class*=language-]>span.lang]:(absolute top-4 right-4 opacity-50 text-xs transition-opacity)',
      '[&_div[class*=language-]:hover>span.lang]:(opacity-0 pointer-events-none)',
      '[&_.shiki]:(shiki-light dark:shiki-dark) [&_.shiki_span]:(shiki-light dark:shiki-dark)',
      // Code groups
      '[&_.vp-code-group]:(rounded-lg bg-zinc-500/10 my-1rem)',
      '[&_.vp-code-group>.tabs]:(h-12 flex px-2 gap-4 text-0.875rem)',
      '[&_.vp-code-group_input]:hidden',
      '[&_.vp-code-group_input+label]:(border-b-2px border-transparent transition-colors inline-block line-height-12 px-2 cursor-pointer)',
      '[&_.vp-code-group_input:checked+label]:border-zinc-500',
      '[&_.vp-code-group_div[class*=language-]:not(.active)]:hidden',
      '[&_.vp-code-group_pre]:m-0',
      // Custom blocks
      '[&_.custom-block]:(my-1rem rounded-lg px-1rem pt-1rem pb-0.5rem text-0.875em border-px)',
      '[&_.custom-block>.custom-block-title]:(mt-0 font-semibold)',
      '[&_.custom-block>p]:(my-0.5em)',
      '[&_.custom-block.info]:(bg-zinc-500/10 border-zinc-500)',
      '[&_.custom-block.tip]:(bg-blue-500/10 border-blue-500)',
      '[&_.custom-block.warning]:(bg-amber-500/10 border-amber-500)',
      '[&_.custom-block.danger]:(bg-red-500/10 border-red-500)',
      '[&_.custom-block.details]:(bg-zinc-500/10 border-zinc-500)',
      '[&_details>summary]:(mb-0.5em font-semibold marker:text-zinc-500)'
    ),
  },
})

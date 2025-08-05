import { defineConfig, presetWind4, presetTypography, presetWebFonts } from 'unocss'
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
  ],
  shortcuts: {},
})

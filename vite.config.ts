import { defineConfig } from 'vite'
import path from 'node:path'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
    AutoImport({
      imports: ['vue'],
    }),
  ],
  resolve: {
    alias: {
      '~': __dirname,
      '#components': path.resolve(__dirname, 'theme', 'components'),
    },
  },
})

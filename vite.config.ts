import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import VueComponents from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'vitepress'],
      dirs: ['composables/**', 'utils/**'],
    }),
    VueComponents({
      dirs: ['components/**'],
    }),
  ],
  resolve: {
    alias: {
      '~': __dirname,
    },
  },
})

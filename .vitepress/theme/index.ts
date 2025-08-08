import { Theme } from 'vitepress'
import App from '~/app.vue'
import type { GiscusProps } from '@giscus/vue'

import 'virtual:uno.css'

export interface ThemeConfig {
  giscus: GiscusProps
}

export default {
  Layout: App,
} satisfies Theme

import { Theme } from 'vitepress'
import Layout from '~/Layout.vue'
import type { GiscusProps } from '@giscus/vue'

import 'virtual:uno.css'

export interface ThemeConfig {
  giscus: GiscusProps
}

export default {
  Layout,
} satisfies Theme

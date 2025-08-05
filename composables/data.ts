import { useData } from 'vitepress'
import type { ThemeConfig } from '~/.vitepress/types'

export const useThemedData = () => useData<ThemeConfig>()

import GiscusRaw from '@giscus/react'
import siteConfig from '@/site.config'
import { useStore } from '@nanostores/react'
import { $currentTheme } from '@/utils/stores'

export function Giscus() {
  const currentTheme = useStore($currentTheme)
  return <GiscusRaw {...siteConfig.giscus} theme={currentTheme} />
}

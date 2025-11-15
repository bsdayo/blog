import { Excalidraw as Draw } from '@excalidraw/excalidraw'
import type { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types'
import { useStore } from '@nanostores/react'
import { $currentTheme } from '@/utils/stores'
import type { ComponentProps } from 'react'

export type ExcalidrawProps = ComponentProps<typeof Draw>

export function ExcalidrawRaw(props: ExcalidrawProps) {
  const currentTheme = useStore($currentTheme)

  const excalidrawAPI = (api: ExcalidrawImperativeAPI) => {
    const interval = setInterval(() => {
      if (api.getSceneElements().length > 0) {
        api.scrollToContent(undefined, {
          fitToContent: true,
        })
        clearInterval(interval)
      }
    }, 10)
  }

  return <Draw viewModeEnabled theme={currentTheme} excalidrawAPI={excalidrawAPI} {...props} />
}

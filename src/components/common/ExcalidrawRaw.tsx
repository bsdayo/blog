import { Excalidraw as Draw, Footer, MainMenu } from '@excalidraw/excalidraw'
import { useStore } from '@nanostores/react'
import { $currentTheme } from '@/utils/stores'
import type { ComponentProps } from 'react'
import type { ExcalidrawImperativeAPI, NormalizedZoomValue } from '@excalidraw/excalidraw/types'

export type ExcalidrawProps = ComponentProps<typeof Draw>

export function ExcalidrawRaw(props: ExcalidrawProps) {
  const currentTheme = useStore($currentTheme)

  const excalidrawAPI = (api: ExcalidrawImperativeAPI) => {
    let interval = setInterval(() => {
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

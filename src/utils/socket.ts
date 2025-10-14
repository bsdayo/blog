import siteConfig from '@/site.config'

export type ServerMessage =
  | {
      type: 'info'
      name: string
      version: string
    }
  | {
      type: 'state'
      connections: number
    }
  | {
      type: 'activity'
      icon?: string
      message: string
    }

let socket: WebSocket | null = null

export function onSocketMessage(callback: (message: ServerMessage) => void) {
  if (!socket) {
    socket = new WebSocket(new URL('/socket', siteConfig.backend))
  }
  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data) as ServerMessage
    callback(data)
  })
}

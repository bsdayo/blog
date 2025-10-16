import { $socketConnections } from '@/utils/stores'
import { useStore } from '@nanostores/react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'

export function FooterConnections() {
  const connections = useStore($socketConnections)
  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger>
        <span>{connections} 人正在看</span>
      </HoverCardTrigger>
      <HoverCardContent className="typography prose-sm" collisionPadding={16}>
        <p>当你打开页面时，浏览器会与后端建立一个 WebSocket 连接，自动推送当前在线人数。</p>
        <p>此功能完全匿名，不会收集任何个人信息。</p>
        <p>
          <a href="https://github.com/bsdayo/blog-backend" target="_blank">
            <SiGithub data-icon />
            &nbsp;bsdayo/blog-backend
          </a>
        </p>
      </HoverCardContent>
    </HoverCard>
  )
}

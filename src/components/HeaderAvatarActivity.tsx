import { cn } from '@/lib/utils'
import { HoverCard, HoverCardTrigger, HoverCardContent } from './ui/hover-card'
import { $activityIconUrl, $activityMessage } from '@/utils/stores'
import { useStore } from '@nanostores/react'
import { useState } from 'react'

export function HeaderAvatarActivity({ className }: { className?: string }) {
  const activityIconUrl = useStore($activityIconUrl)
  const activityMessage = useStore($activityMessage)

  const [open, setOpen] = useState(false)

  return (
    <HoverCard openDelay={0} open={open} onOpenChange={(o) => setOpen(o)}>
      <HoverCardTrigger asChild>
        <img
          className={cn('activity-icon hidden', className)}
          src={activityIconUrl}
          onClick={() => setOpen(true)}
        />
      </HoverCardTrigger>
      <HoverCardContent className="w-fit z-200 text-sm" collisionPadding={16}>
        {activityMessage}
      </HoverCardContent>
    </HoverCard>
  )
}

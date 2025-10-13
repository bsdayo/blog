import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from './ui/navigation-menu'
import { Button } from './ui/button'
import { Eclipse, Info, Newspaper, Notebook } from 'lucide-react'
import { toggleTheme } from '@/utils/theme'

export function HeaderActions() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/posts/">
            <span className="hidden sm:inline">文章</span>
            <Newspaper className="sm:hidden" />
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="https://memos.bsdayo.moe" target="_blank">
            <span className="hidden sm:inline">速记</span>
            <Notebook className="sm:hidden" />
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about/">
            <span className="hidden sm:inline">关于</span>
            <Info className="sm:hidden" />
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button size="icon" variant="ghost" onClick={() => toggleTheme()}>
            <Eclipse />
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from './ui/navigation-menu'
import { Button } from './ui/button'
import { Eclipse, Info, Menu, Newspaper, Notebook } from 'lucide-react'
import { toggleTheme } from '@/utils/theme'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu'
import type { HTMLAttributeAnchorTarget, ReactNode } from 'react'

interface HeaderLink {
  icon: ReactNode
  name: string
  href: string
  target?: HTMLAttributeAnchorTarget
}

const headerLinks: HeaderLink[] = [
  {
    icon: <Newspaper />,
    name: '文章',
    href: '/posts/',
  },
  {
    icon: <Notebook />,
    name: '速记',
    href: 'https://memos.bsdayo.moe',
    target: '_blank',
  },
  {
    icon: <Info />,
    name: '关于',
    href: '/about/',
  },
]

export function HeaderActions() {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild className="sm:hidden">
          <Button size="icon-lg" variant="ghost">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-200" collisionPadding={16}>
          {headerLinks.map((link) => (
            <a key={link.href} href={link.href} target={link.target}>
              <DropdownMenuItem>{link.name}</DropdownMenuItem>
            </a>
          ))}

          <DropdownMenuSeparator />

          <Button size="icon" variant="ghost" onClick={() => toggleTheme()}>
            <Eclipse />
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>

      <NavigationMenu className="hidden sm:block">
        <NavigationMenuList>
          {headerLinks.map((link) => (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink href={link.href} target={link.target}>
                {link.name}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <Button size="icon" variant="ghost" onClick={() => toggleTheme()}>
              <Eclipse />
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  )
}

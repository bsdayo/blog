import { onScroll } from 'animejs'

export function onTitleScrolled(options: Parameters<typeof onScroll>[0]) {
  onScroll({
    target: '.typography',
    container: 'body',
    leave: 'start start',
    ...options,
  })
}

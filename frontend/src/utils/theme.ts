import { $currentTheme } from './stores'

declare global {
  function _getTheme(): 'light' | 'dark'
  function _setTheme(theme: 'light' | 'dark', target?: Document): void
}

export function toggleTheme() {
  function toggle() {
    const isDark = document.documentElement.classList.contains('dark')
    const theme = isDark ? 'light' : 'dark'
    globalThis._setTheme(theme)
    $currentTheme.set(theme)
  }

  if (document.startViewTransition) {
    document.startViewTransition(toggle)
  } else {
    toggle()
  }
}

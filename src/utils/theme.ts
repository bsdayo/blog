declare global {
  function setTheme(theme: 'light' | 'dark', target?: Document): void
}

export function toggleTheme() {
  function toggle() {
    const isDark = document.documentElement.classList.contains('dark')
    globalThis.setTheme(isDark ? 'light' : 'dark')
  }

  if (document.startViewTransition) {
    document.startViewTransition(toggle)
  } else {
    toggle()
  }
}

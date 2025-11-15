import { atom } from 'nanostores'

export const $currentTheme = atom<'light' | 'dark'>('light')

export const $socketConnections = atom<number>(0)

export const $activityIconUrl = atom<string | undefined>()
export const $activityMessage = atom<string | undefined>()

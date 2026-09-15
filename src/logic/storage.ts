import type { AttemptState } from '../types'

export const STORAGE_KEY = 'microbit-homework:current-attempt:v1'

export const makeAttemptId = () => `MB-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`

export function loadAttempt(): AttemptState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) as AttemptState : null
  } catch { return null }
}

export function saveAttempt(state: AttemptState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function clearAttempt() { localStorage.removeItem(STORAGE_KEY) }

export function downloadJson(filename: string, value: unknown) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

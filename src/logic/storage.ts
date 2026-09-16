import type { AttemptState } from '../types'

export const STORAGE_PREFIX = 'microbit-homework:attempt:v2:'
export const storageKey = (lessonId: string) => `${STORAGE_PREFIX}${lessonId}`

export const makeAttemptId = () => `MB-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 6).toUpperCase()}`

export function loadAttempt(lessonId: string): AttemptState | null {
  try {
    const raw = localStorage.getItem(storageKey(lessonId))
    return raw ? JSON.parse(raw) as AttemptState : null
  } catch { return null }
}

export function saveAttempt(state: AttemptState) {
  localStorage.setItem(storageKey(state.lessonId), JSON.stringify(state))
}

export function clearAttempt(lessonId: string) { localStorage.removeItem(storageKey(lessonId)) }

export function downloadJson(filename: string, value: unknown) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

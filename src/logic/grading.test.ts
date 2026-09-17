import { describe, expect, it } from 'vitest'
import { lesson } from '../data/lesson'
import { trexFossilLesson } from '../data/trexFossilLesson'
import { gradeLesson, isCorrect } from './grading'

describe('grading', () => {
  it('gives zero to unanswered questions', () => { expect(gradeLesson(lesson, {}).score).toBe(0) })
  it('calculates the exact weighted total for all correct answers', () => {
    const answers = Object.fromEntries(lesson.questions.map((q) => [q.id, q.correct]))
    expect(gradeLesson(lesson, answers)).toMatchObject({ score: 10, maxScore: 10, percentage: 100 })
  })
  it('requires every match pair and exact order', () => {
    const match = lesson.questions.find((q) => q.type === 'match')!
    const order = lesson.questions.find((q) => q.type === 'order')!
    expect(isCorrect(match, { 'show-heart': 'f-heart' })).toBe(false)
    expect(isCorrect(order, [...order.correct].reverse())).toBe(false)
  })
  it('grades all five T-Rex & Fossil questions by their configured weights', () => {
    const answers = Object.fromEntries(trexFossilLesson.questions.map((question) => [question.id, question.correct]))
    expect(trexFossilLesson.questions).toHaveLength(5)
    expect(gradeLesson(trexFossilLesson, answers)).toMatchObject({ score: 10, maxScore: 10, percentage: 100 })
  })
})

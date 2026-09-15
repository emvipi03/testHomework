import type { Answer, GradeResult, Lesson, Question } from '../types'

const equalMaps = (a: Record<string, string>, b: Record<string, string>) =>
  Object.keys(b).every((key) => a[key] === b[key]) && Object.keys(a).length === Object.keys(b).length

export function isAnswered(question: Question, answer: Answer | undefined): boolean {
  if (answer === undefined) return false
  if (typeof answer === 'string') return answer.length > 0
  if (Array.isArray(answer)) return question.type === 'order' ? answer.length === question.items.length : answer.length > 0
  return question.type === 'match' && Object.keys(answer).length === question.blocks.length
}

export function isCorrect(question: Question, answer: Answer | undefined): boolean {
  if (!isAnswered(question, answer)) return false
  if (question.type === 'choice' || question.type === 'fill') return answer === question.correct
  if (question.type === 'order') return Array.isArray(answer) && answer.every((id, i) => id === question.correct[i])
  return !Array.isArray(answer) && typeof answer === 'object' && equalMaps(answer, question.correct)
}

export function gradeLesson(lesson: Lesson, answers: Record<string, Answer>): GradeResult {
  const details = lesson.questions.map((question) => {
    const answered = isAnswered(question, answers[question.id])
    const correct = isCorrect(question, answers[question.id])
    return { questionId: question.id, correct, answered, weight: question.weight, earned: correct ? question.weight : 0 }
  })
  const score = details.reduce((sum, item) => sum + item.earned, 0)
  const maxScore = details.reduce((sum, item) => sum + item.weight, 0)
  return { score, maxScore, percentage: Math.round((score / maxScore) * 100), details }
}

export type Stage = 'welcome' | 'review' | 'quiz' | 'practice' | 'result'

export type BlockKind = 'event' | 'basic' | 'input' | 'control'

export interface BlockInfo {
  id: string
  label: string
  kind: BlockKind
  icon?: string
}

export interface ReviewCardData {
  id: string
  eyebrow: string
  title: string
  body: string
  tip: string
  illustration?: 'buttons' | 'led'
  image?: { src: string; alt: string }
}

export interface ChoiceQuestion {
  id: string
  type: 'choice'
  prompt: string
  weight: number
  options: Array<{ id: string; text: string; block?: BlockInfo }>
  correct: string
  explanation: string
}

export interface MatchQuestion {
  id: string
  type: 'match'
  prompt: string
  weight: number
  blocks: BlockInfo[]
  functions: Array<{ id: string; text: string }>
  correct: Record<string, string>
  explanation: string
}

export interface OrderQuestion {
  id: string
  type: 'order'
  prompt: string
  weight: number
  items: BlockInfo[]
  correct: string[]
  explanation: string
}

export interface FillQuestion {
  id: string
  type: 'fill'
  prompt: string
  weight: number
  choices: BlockInfo[]
  correct: string
  explanation: string
}

export type Question = ChoiceQuestion | MatchQuestion | OrderQuestion | FillQuestion
export type Answer = string | string[] | Record<string, string>

export interface Lesson {
  id: string
  title: string
  subtitle: string
  reviews: ReviewCardData[]
  questions: Question[]
  practice: { title: string; brief: string; checklist: string[]; starterCode: string }
  hero?: { kicker: string; lines: [string, string, string]; description: string; image: string; imageAlt: string }
}

export interface LessonCatalogItem {
  id: string
  number: number
  title: string
  subtitle: string
  description: string
  duration: string
  difficulty: 'Starter' | 'Explorer' | 'Challenge'
  icon: string
  color: string
  status: 'available' | 'coming-soon'
  tags: string[]
}

export interface AttemptState {
  attemptId: string
  lessonId: string
  studentName: string
  stage: Stage
  answers: Record<string, Answer>
  submittedAt?: string
  startedAt: string
  practiceVisited: boolean
}

export interface QuestionResult {
  questionId: string
  correct: boolean
  earned: number
  weight: number
  answered: boolean
}

export interface GradeResult {
  score: number
  maxScore: number
  percentage: number
  details: QuestionResult[]
}

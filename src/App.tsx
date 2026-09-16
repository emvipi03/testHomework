import { useEffect, useMemo, useState } from 'react'
import { lesson } from './data/lesson'
import { courseLessons } from './data/course'
import { gradeLesson } from './logic/grading'
import { clearAttempt, downloadJson, loadAttempt, makeAttemptId, saveAttempt } from './logic/storage'
import type { Answer, AttemptState, Lesson, Stage } from './types'
import { CourseCatalog } from './components/CourseCatalog'
import { ProgressHeader } from './components/ProgressHeader'
import { ReviewCards } from './components/ReviewCards'
import { Quiz } from './components/Quiz'
import { Practice } from './components/Practice'
import { Results } from './components/Results'

const lessonsById: Record<string, Lesson> = { [lesson.id]: lesson }
const lessonIdFromHash = () => window.location.hash.match(/^#\/lesson\/([^/?]+)/)?.[1]
const newState = (lessonId: string): AttemptState => ({ attemptId: makeAttemptId(), lessonId, studentName: '', stage: 'welcome', answers: {}, startedAt: new Date().toISOString(), practiceVisited: false })

export default function App() {
  const [route, setRoute] = useState(window.location.hash)
  const requestedLessonId = lessonIdFromHash()
  const activeLesson = requestedLessonId ? lessonsById[requestedLessonId] : undefined
  const initialLessonId = activeLesson?.id ?? lesson.id
  const [state, setState] = useState<AttemptState>(() => loadAttempt(initialLessonId) ?? newState(initialLessonId))
  const [name, setName] = useState(state.studentName)
  const [nameError, setNameError] = useState('')

  useEffect(() => {
    const updateRoute = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', updateRoute)
    return () => window.removeEventListener('hashchange', updateRoute)
  }, [])
  useEffect(() => {
    if (!activeLesson || state.lessonId === activeLesson.id) return
    const next = loadAttempt(activeLesson.id) ?? newState(activeLesson.id)
    setState(next); setName(next.studentName); setNameError('')
  }, [activeLesson, state.lessonId])
  useEffect(() => { saveAttempt(state) }, [state])

  const grade = useMemo(() => gradeLesson(activeLesson ?? lesson, state.answers), [activeLesson, state.answers])
  const go = (stage: Stage) => setState((current) => ({ ...current, stage, practiceVisited: current.practiceVisited || stage === 'practice' }))
  const goHome = () => { window.location.hash = '/' }
  const start = (event: React.FormEvent) => {
    event.preventDefault()
    const clean = name.trim().replace(/\s+/g, ' ')
    if (!clean) { setNameError('Please enter your name before starting.'); return }
    setNameError(''); setState((current) => ({ ...current, studentName: clean, stage: 'review' }))
  }
  const clear = () => {
    if (!window.confirm('Clear your name, answers, and all progress for this attempt?')) return
    clearAttempt(state.lessonId)
    const fresh = newState(state.lessonId)
    setState(fresh); setName('')
  }
  const submit = () => setState((current) => ({ ...current, stage: 'result', submittedAt: new Date().toISOString(), practiceVisited: true }))
  const retry = () => {
    const fresh = newState(state.lessonId)
    setState({ ...fresh, studentName: state.studentName, stage: 'review' }); setName(state.studentName)
  }
  const exportResult = () => downloadJson(`result-${state.attemptId}.json`, { schemaVersion: 2, attempt: state, lesson: { id: activeLesson!.id, title: activeLesson!.title }, grade })
  const progressFor = (lessonId: string) => {
    const saved = lessonId === state.lessonId ? state : loadAttempt(lessonId)
    if (!saved?.studentName) return undefined
    const labels: Record<Stage, string> = { welcome: 'Start mission', review: 'Continue review', quiz: 'Continue quiz', practice: 'Continue lab', result: 'View results' }
    return labels[saved.stage]
  }

  if (!activeLesson) return <CourseCatalog key={route} lessons={courseLessons} getProgress={progressFor} />

  return <div className="app"><ProgressHeader stage={state.stage} name={state.studentName} onClear={clear} onHome={goHome} /><main id="main">
    {state.stage === 'welcome' && <section className="welcome"><div className="hero-copy"><button className="back-link" onClick={goHome}>← All missions</button><span className="kicker">Mission 01 · micro:bit</span><h1>Press a button.<br /><em>Light it up.</em><br />Launch an idea!</h1><p>Review the essentials, solve 6 block challenges, and build a real program in Microsoft MakeCode.</p><div className="mission-title"><span>Today’s mission</span><b>{activeLesson.title}</b></div><form onSubmit={start} noValidate><label htmlFor="student-name">Inventor name</label><div className="name-row"><input id="student-name" value={name} onChange={(event) => { setName(event.target.value); setNameError('') }} placeholder="For example: Alex" maxLength={40} aria-invalid={!!nameError} aria-describedby="name-error" autoFocus /><button className="primary">Start mission <span>→</span></button></div><p className="form-error" id="name-error" role="alert">{nameError}</p><small>Progress is saved in this browser. No account needed.</small></form></div><div className="hero-board" aria-hidden="true"><div className="orbit one">A</div><div className="orbit two">B</div><div className="pixel-heart">{Array.from({ length: 25 }, (_, i) => <i key={i} className={[1,3,5,7,9,10,14,16,18,22].includes(i) ? 'on' : ''} />)}</div><div className="wire-block purple">show icon <b>♥</b></div><div className="wire-block blue">on button <b>A</b> pressed</div></div></section>}
    {state.stage === 'review' && <ReviewCards cards={activeLesson.reviews} onDone={() => go('quiz')} />}
    {state.stage === 'quiz' && <Quiz lesson={activeLesson} answers={state.answers} setAnswer={(id, answer: Answer) => setState((current) => ({ ...current, answers: { ...current.answers, [id]: answer } }))} onNext={() => go('practice')} />}
    {state.stage === 'practice' && <Practice brief={activeLesson.practice.brief} checklist={activeLesson.practice.checklist} starterCode={activeLesson.practice.starterCode} onBack={() => go('quiz')} onSubmit={submit} />}
    {state.stage === 'result' && <Results lesson={activeLesson} answers={state.answers} grade={grade} attemptId={state.attemptId} onRetry={retry} onExport={exportResult} />}
  </main><footer><span>Bricks 4 Kidz Vietnam · LogicLab</span><span>Learning by building</span></footer></div>
}

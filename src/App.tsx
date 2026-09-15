import { useEffect, useState } from 'react'
import { lesson } from './data/lesson'
import { gradeLesson } from './logic/grading'
import { clearAttempt, downloadJson, loadAttempt, makeAttemptId, saveAttempt } from './logic/storage'
import type { Answer, AttemptState, Stage } from './types'
import { ProgressHeader } from './components/ProgressHeader'
import { ReviewCards } from './components/ReviewCards'
import { Quiz } from './components/Quiz'
import { Practice } from './components/Practice'
import { Results } from './components/Results'

const newState = (): AttemptState => ({ attemptId: makeAttemptId(), lessonId: lesson.id, studentName: '', stage: 'welcome', answers: {}, startedAt: new Date().toISOString(), practiceVisited: false })

export default function App() {
  const [state, setState] = useState<AttemptState>(() => loadAttempt() ?? newState())
  const [name, setName] = useState(state.studentName)
  const [nameError, setNameError] = useState('')
  useEffect(() => { saveAttempt(state) }, [state])
  const go = (stage: Stage) => setState((s) => ({ ...s, stage, practiceVisited: s.practiceVisited || stage === 'practice' }))
  const start = (e: React.FormEvent) => { e.preventDefault(); const clean = name.trim().replace(/\s+/g, ' '); if (!clean) { setNameError('Em hãy nhập tên trước khi bắt đầu nhé!'); return } setNameError(''); setState((s) => ({ ...s, studentName: clean, stage: 'review' })) }
  const clear = () => { if (!window.confirm('Xóa tên, câu trả lời và toàn bộ tiến độ của lượt này?')) return; clearAttempt(); const fresh = newState(); setState(fresh); setName('') }
  const submit = () => setState((s) => ({ ...s, stage: 'result', submittedAt: new Date().toISOString(), practiceVisited: true }))
  const retry = () => { const fresh = newState(); setState({ ...fresh, studentName: state.studentName, stage: 'review' }); setName(state.studentName) }
  const grade = gradeLesson(lesson, state.answers)
  const exportResult = () => downloadJson(`ket-qua-${state.attemptId}.json`, { schemaVersion: 1, attempt: state, lesson: { id: lesson.id, title: lesson.title }, grade })
  return <div className="app"><ProgressHeader stage={state.stage} name={state.studentName} onClear={clear} /><main id="main">
    {state.stage === 'welcome' && <section className="welcome"><div className="hero-copy"><span className="kicker">Bài tập về nhà · micro:bit</span><h1>Nút nhấn.<br /><em>Đèn sáng.</em><br />Ý tưởng bay cao!</h1><p>Ôn kiến thức, chinh phục 6 câu hỏi và xây một chương trình thật trên MakeCode.</p><form onSubmit={start} noValidate><label htmlFor="student-name">Tên nhà sáng chế</label><div className="name-row"><input id="student-name" value={name} onChange={(e) => { setName(e.target.value); setNameError('') }} placeholder="Ví dụ: Minh Anh" maxLength={40} aria-invalid={!!nameError} aria-describedby="name-error" autoFocus /><button className="primary">Bắt đầu nhiệm vụ <span>→</span></button></div><p className="form-error" id="name-error" role="alert">{nameError}</p><small>Tiến độ được lưu trên trình duyệt này. Không cần tài khoản.</small></form></div><div className="hero-board" aria-hidden="true"><div className="orbit one">A</div><div className="orbit two">B</div><div className="pixel-heart">{Array.from({ length: 25 }, (_, i) => <i key={i} className={[1,3,5,7,9,10,14,16,18,22].includes(i) ? 'on' : ''} />)}</div><div className="wire-block purple">hiện biểu tượng <b>♥</b></div><div className="wire-block blue">khi nút <b>A</b> được nhấn</div></div></section>}
    {state.stage === 'review' && <ReviewCards cards={lesson.reviews} onDone={() => go('quiz')} />}
    {state.stage === 'quiz' && <Quiz lesson={lesson} answers={state.answers} setAnswer={(id, answer: Answer) => setState((s) => ({ ...s, answers: { ...s.answers, [id]: answer } }))} onNext={() => go('practice')} />}
    {state.stage === 'practice' && <Practice brief={lesson.practice.brief} checklist={lesson.practice.checklist} starterCode={lesson.practice.starterCode} onBack={() => go('quiz')} onSubmit={submit} />}
    {state.stage === 'result' && <Results lesson={lesson} answers={state.answers} grade={grade} attemptId={state.attemptId} onRetry={retry} onExport={exportResult} />}
  </main><footer><span>Trạm Micro:bit · Học bằng cách làm</span><span>Dữ liệu chỉ lưu local trên thiết bị</span></footer></div>
}

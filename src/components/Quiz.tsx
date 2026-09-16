import { useState } from 'react'
import type { Answer, FillQuestion, Lesson, MatchQuestion, OrderQuestion } from '../types'
import { BlockVisual } from './BlockVisual'

interface Props { lesson: Lesson; answers: Record<string, Answer>; setAnswer: (id: string, answer: Answer) => void; onNext: () => void }

function Match({ question, answer, setAnswer }: { question: MatchQuestion; answer?: Answer; setAnswer: (a: Answer) => void }) {
  const value = (!Array.isArray(answer) && typeof answer === 'object' ? answer : {}) as Record<string, string>
  return <div className="match-grid">{question.blocks.map((block) => <div className="match-row" key={block.id}><BlockVisual block={block} compact /><label><span>Match with</span><select aria-label={`Function of ${block.label}`} value={value[block.id] ?? ''} onChange={(e) => setAnswer({ ...value, [block.id]: e.target.value })}><option value="">Choose a function…</option>{question.functions.map((f) => <option key={f.id} value={f.id}>{f.text}</option>)}</select></label></div>)}</div>
}

function Order({ question, answer, setAnswer }: { question: OrderQuestion; answer?: Answer; setAnswer: (a: Answer) => void }) {
  const initial = Array.isArray(answer) && answer.length ? answer : question.items.map((item) => item.id)
  const [selected, setSelected] = useState<string | null>(null)
  const move = (from: number, to: number) => { const next = [...initial]; const [item] = next.splice(from, 1); next.splice(to, 0, item); setAnswer(next) }
  const place = (target: number) => { if (!selected) return; move(initial.indexOf(selected), target); setSelected(null) }
  return <div className="order-list">{initial.map((id, index) => { const block = question.items.find((item) => item.id === id)!; return <div className={`order-item ${selected === id ? 'selected' : ''}`} draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', id)} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); move(initial.indexOf(e.dataTransfer.getData('text/plain')), index) }} key={id}>
    <button className="order-position" aria-label={`Place selected block in position ${index + 1}`} onClick={() => selected ? place(index) : setSelected(id)}>{index + 1}</button><BlockVisual block={block} compact /><div className="move-buttons"><button aria-label="Move up" disabled={index === 0} onClick={() => move(index, index - 1)}>↑</button><button aria-label="Move down" disabled={index === initial.length - 1} onClick={() => move(index, index + 1)}>↓</button></div>
  </div>})}<p className="interaction-hint">Drag and drop, use ↑ ↓, or select a block and then choose a numbered position.</p></div>
}

function Fill({ question, answer, setAnswer }: { question: FillQuestion; answer?: Answer; setAnswer: (a: Answer) => void }) {
  const placed = typeof answer === 'string' ? answer : ''
  const [selected, setSelected] = useState('')
  const drop = (id: string) => { if (question.choices.some((item) => item.id === id)) setAnswer(id) }
  return <div className="fill-layout"><div className="program-stack"><BlockVisual block={{ id: 'event-b', label: 'on button B pressed', kind: 'input', icon: 'B' }} /><button className={`drop-zone ${placed ? 'filled' : ''}`} aria-label="Missing block position" onClick={() => selected && drop(selected)} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); drop(e.dataTransfer.getData('text/plain')) }}>{placed ? <BlockVisual block={question.choices.find((item) => item.id === placed)!} compact /> : <><span>+</span> {selected ? 'Tap to place the selected block' : 'Drop a block here, or select one and tap'}</>}</button></div><div className="block-bank" aria-label="Block bank">{question.choices.map((block) => <button key={block.id} draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', block.id)} onClick={() => setSelected(block.id)} className={selected === block.id ? 'selected' : ''} aria-pressed={selected === block.id}><BlockVisual block={block} compact /></button>)}</div></div>
}

export function Quiz({ lesson, answers, setAnswer, onNext }: Props) {
  const answered = lesson.questions.filter((q) => answers[q.id] !== undefined).length
  return <section className="page"><div className="section-heading left"><span className="kicker">Knowledge mission</span><h1>Decode the blocks</h1><p>Complete all 6 questions, then enter the coding lab. Unanswered questions earn 0 points.</p></div><div className="quiz-status">Attempted <b>{answered}/{lesson.questions.length}</b></div>
    <div className="questions">{lesson.questions.map((question, index) => <article className="question-card" key={question.id} data-question={question.id}><div className="question-title"><span>{String(index + 1).padStart(2, '0')}</span><div><p>{question.type === 'choice' ? 'Multiple choice' : question.type === 'match' ? 'Matching' : question.type === 'order' ? 'Ordering' : 'Missing block' } · {question.weight} {question.weight === 1 ? 'point' : 'points'}</p><h2>{question.prompt}</h2></div></div>
      {question.type === 'choice' && <div className="choice-grid">{question.options.map((option) => <label className={`choice ${answers[question.id] === option.id ? 'selected' : ''}`} key={option.id}><input type="radio" name={question.id} value={option.id} checked={answers[question.id] === option.id} onChange={() => setAnswer(question.id, option.id)} />{option.block && <BlockVisual block={option.block} />}<span className="choice-caption"><b>{option.id.toUpperCase()}</b>{option.text}</span></label>)}</div>}
      {question.type === 'match' && <Match question={question} answer={answers[question.id]} setAnswer={(a) => setAnswer(question.id, a)} />}
      {question.type === 'order' && <Order question={question} answer={answers[question.id]} setAnswer={(a) => setAnswer(question.id, a)} />}
      {question.type === 'fill' && <Fill question={question} answer={answers[question.id]} setAnswer={(a) => setAnswer(question.id, a)} />}
    </article>)}</div><div className="actions between"><span>You can still return and edit your answers before submitting.</span><button className="primary" onClick={onNext}>Enter the coding lab <span>→</span></button></div>
  </section>
}

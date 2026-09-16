import type { Stage } from '../types'
import { BrandLockup } from './BrandLockup'

const stages: Array<{ id: Stage; label: string }> = [
  { id: 'welcome', label: 'Start' }, { id: 'review', label: 'Review' }, { id: 'quiz', label: 'Quiz' }, { id: 'practice', label: 'Lab' }, { id: 'result', label: 'Results' },
]

export function ProgressHeader({ stage, name, onClear, onHome }: { stage: Stage; name: string; onClear: () => void; onHome: () => void }) {
  const active = stages.findIndex((item) => item.id === stage)
  return (
    <header className="topbar">
      <button className="brand brand-button" onClick={onHome} aria-label="Back to mission library"><span className="brand-mark">µ</span><span>MISSION<br /><b>LIBRARY</b></span></button>
      <div className="progress-wrap">
        <div className="progress-meta"><span>{name ? `Inventor ${name}` : 'Your mission journey'}</span><b>{active + 1}/5</b></div>
        <div className="progress" role="progressbar" aria-valuemin={1} aria-valuemax={5} aria-valuenow={active + 1}><span style={{ width: `${(active + 1) * 20}%` }} /></div>
        <div className="stage-labels">{stages.map((item, i) => <span key={item.id} className={i <= active ? 'done' : ''}>{item.label}</span>)}</div>
      </div>
      <div className="header-tools"><BrandLockup compact /><button className="ghost danger" onClick={onClear} disabled={!name}>Clear progress</button></div>
    </header>
  )
}

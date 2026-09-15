import type { Stage } from '../types'

const stages: Array<{ id: Stage; label: string }> = [
  { id: 'welcome', label: 'Bắt đầu' }, { id: 'review', label: 'Ôn bài' }, { id: 'quiz', label: 'Làm bài' }, { id: 'practice', label: 'Thực hành' }, { id: 'result', label: 'Kết quả' },
]

export function ProgressHeader({ stage, name, onClear }: { stage: Stage; name: string; onClear: () => void }) {
  const active = stages.findIndex((item) => item.id === stage)
  return (
    <header className="topbar">
      <a className="brand" href="#main" aria-label="Trạm Microbit"><span className="brand-mark">µ</span><span>TRẠM<br /><b>MICRO:BIT</b></span></a>
      <div className="progress-wrap">
        <div className="progress-meta"><span>{name ? `Nhà sáng chế ${name}` : 'Hành trình của em'}</span><b>{active + 1}/5</b></div>
        <div className="progress" role="progressbar" aria-valuemin={1} aria-valuemax={5} aria-valuenow={active + 1}><span style={{ width: `${(active + 1) * 20}%` }} /></div>
        <div className="stage-labels">{stages.map((item, i) => <span key={item.id} className={i <= active ? 'done' : ''}>{item.label}</span>)}</div>
      </div>
      <button className="ghost danger" onClick={onClear} disabled={!name}>Xóa tiến độ</button>
    </header>
  )
}

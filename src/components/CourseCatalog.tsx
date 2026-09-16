import type { LessonCatalogItem } from '../types'
import { BrandLockup } from './BrandLockup'

function LessonCard({ item, progress }: { item: LessonCatalogItem; progress?: string }) {
  const available = item.status === 'available'
  const content = <>
    <div className="lesson-card-top"><span className="lesson-number">{String(item.number).padStart(2, '0')}</span><span className="lesson-icon" style={{ background: item.color }}>{item.icon}</span></div>
    <div className="lesson-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    <h2>{item.title}</h2><h3>{item.subtitle}</h3><p>{item.description}</p>
    <div className="lesson-card-meta"><span>◷ {item.duration}</span><span>◆ {item.difficulty}</span></div>
    <div className="lesson-card-action">{available ? <><b>{progress ?? 'Start mission'}</b><span>→</span></> : <><b>Coming soon</b><span>◌</span></>}</div>
  </>
  return available ? <a className="lesson-card available" href={`#/lesson/${item.id}`}>{content}</a> : <article className="lesson-card disabled" aria-disabled="true">{content}</article>
}

export function CourseCatalog({ lessons, getProgress }: { lessons: LessonCatalogItem[]; getProgress: (id: string) => string | undefined }) {
  return <div className="catalog-page">
    <nav className="catalog-nav"><a href="#/" className="course-brand"><span className="brand-mark">µ</span><span>MICRO:BIT<br /><b>MISSION LAB</b></span></a><BrandLockup /></nav>
    <main className="catalog-main"><section className="catalog-hero"><div><span className="kicker">Bricks 4 Kidz · Coding at home</span><h1>Small board.<br /><em>Big ideas.</em></h1><p>Choose a mission, review the key ideas, solve block challenges, and build a real program in Microsoft MakeCode.</p></div><div className="catalog-board" aria-hidden="true"><span>CODE</span><b>QUEST</b><div className="catalog-pixels">{Array.from({ length: 25 }, (_, i) => <i className={[1,3,5,7,9,10,14,16,18,22].includes(i) ? 'on' : ''} key={i} />)}</div></div></section>
      <section className="lesson-library"><div className="library-heading"><div><span className="kicker">Mission library</span><h2>Pick your next challenge</h2></div><p><b>{lessons.filter((item) => item.status === 'available').length}</b> mission ready · More coding adventures are on the way.</p></div><div className="lesson-grid">{lessons.map((item) => <LessonCard key={item.id} item={item} progress={getProgress(item.id)} />)}</div></section>
    </main><footer><span>Bricks 4 Kidz Vietnam · LogicLab</span><span>Progress stays on this device</span></footer>
  </div>
}

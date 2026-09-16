import type { ReviewCardData } from '../types'
import { MicrobitIllustration } from './MicrobitIllustration'

export function ReviewCards({ cards, onDone }: { cards: ReviewCardData[]; onDone: () => void }) {
  return (
    <section className="page review-page">
      <div className="section-heading"><span className="kicker">Power up your knowledge</span><h1>Quick review before launch</h1><p>Read both cards below. The answers are still safely hidden!</p></div>
      <div className="review-grid">{cards.map((card) => <article className="review-card" key={card.id}>
        <div><span className="eyebrow">{card.eyebrow}</span><h2>{card.title}</h2><p>{card.body}</p><aside><b>Memory tip</b><span>{card.tip}</span></aside></div>
        <MicrobitIllustration type={card.illustration} />
      </article>)}</div>
      <div className="actions end"><button className="primary" onClick={onDone}>I’m ready <span>→</span></button></div>
    </section>
  )
}

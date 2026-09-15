import type { ReviewCardData } from '../types'
import { MicrobitIllustration } from './MicrobitIllustration'

export function ReviewCards({ cards, onDone }: { cards: ReviewCardData[]; onDone: () => void }) {
  return (
    <section className="page review-page">
      <div className="section-heading"><span className="kicker">Nạp năng lượng kiến thức</span><h1>Ôn nhanh trước khi xuất phát</h1><p>Đọc hai thẻ dưới đây. Đáp án vẫn đang được giữ bí mật nhé!</p></div>
      <div className="review-grid">{cards.map((card) => <article className="review-card" key={card.id}>
        <div><span className="eyebrow">{card.eyebrow}</span><h2>{card.title}</h2><p>{card.body}</p><aside><b>Mẹo nhớ</b><span>{card.tip}</span></aside></div>
        <MicrobitIllustration type={card.illustration} />
      </article>)}</div>
      <div className="actions end"><button className="primary" onClick={onDone}>Mình đã sẵn sàng <span>→</span></button></div>
    </section>
  )
}

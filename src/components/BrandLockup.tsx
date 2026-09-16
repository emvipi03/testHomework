export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return <div className={`brand-lockup ${compact ? 'compact' : ''}`} aria-label="Bricks 4 Kidz Vietnam and LogicLab">
    <a href="https://bricks4kidz.vn/en/" target="_blank" rel="noreferrer" title="Bricks 4 Kidz Vietnam">
      <img src="./assets/brands/bricks4kidz.svg" alt="Bricks 4 Kidz" />
      <span>Vietnam</span>
    </a>
    <i aria-hidden="true" />
    <a href="https://logiclab.edu.vn/" target="_blank" rel="noreferrer" title="LogicLab">
      <img src="./assets/brands/logiclab.png" alt="LogicLab" />
    </a>
  </div>
}

import type { BlockInfo } from '../types'

const colors = { event: '#f1c40f', input: '#1261a6', basic: '#7b4ab5', control: '#ee8c24' }

export function BlockVisual({ block, compact = false }: { block: BlockInfo; compact?: boolean }) {
  const fill = colors[block.kind]
  return (
    <svg className={`block-visual ${compact ? 'compact' : ''}`} viewBox="0 0 300 76" role="img" aria-label={`${block.label} block`}>
      <path d="M14 5 H92 C98 5 98 16 108 16 H137 C147 16 147 5 153 5 H278 Q292 5 292 19 V57 Q292 70 278 70 H153 C147 70 147 60 137 60 H108 C98 60 98 70 92 70 H14 Q5 70 5 60 V16 Q5 5 14 5Z" fill={fill} stroke="#172b3d" strokeWidth="3" />
      <circle cx="36" cy="38" r="20" fill="rgba(255,255,255,.2)" />
      <text x="36" y="45" textAnchor="middle" fontSize="22" fontWeight="800" fill="white">{block.icon ?? '•'}</text>
      <text x="66" y="44" fontSize="17" fontWeight="700" fill="white">{block.label}</text>
    </svg>
  )
}

export function MicrobitIllustration({ type }: { type: 'buttons' | 'led' }) {
  const heart = new Set(['1-0','3-0','0-1','2-1','4-1','0-2','4-2','1-3','3-3','2-4'])
  return (
    <svg className="microbit-art" viewBox="0 0 340 210" role="img" aria-label={type === 'buttons' ? 'Minh họa nút A và B trên micro:bit' : 'Minh họa trái tim trên màn hình LED 5 nhân 5'}>
      <rect x="14" y="8" width="312" height="186" rx="28" fill="#15314b" />
      <path d="M34 32h42M264 32h42M34 169h42M264 169h42" stroke="#32d2a3" strokeWidth="8" strokeLinecap="round" />
      {Array.from({ length: 25 }, (_, i) => {
        const x = i % 5, y = Math.floor(i / 5)
        const on = type === 'led' && heart.has(`${x}-${y}`)
        return <circle key={i} cx={120 + x * 25} cy={50 + y * 25} r="6.5" fill={on ? '#ff5277' : '#466078'} />
      })}
      <circle cx="62" cy="104" r="23" fill={type === 'buttons' ? '#ffcf4a' : '#334e65'} stroke="#f7f8f9" strokeWidth="3" />
      <circle cx="278" cy="104" r="23" fill={type === 'buttons' ? '#ffcf4a' : '#334e65'} stroke="#f7f8f9" strokeWidth="3" />
      <text x="62" y="111" textAnchor="middle" fill="white" fontWeight="800" fontSize="20">A</text>
      <text x="278" y="111" textAnchor="middle" fill="white" fontWeight="800" fontSize="20">B</text>
      {type === 'buttons' && <><path d="M62 71v-20M278 71v-20" stroke="#ffcf4a" strokeWidth="4" /><text x="170" y="184" textAnchor="middle" fill="#dbe7f0" fontSize="14">Nhấn để tạo sự kiện</text></>}
    </svg>
  )
}

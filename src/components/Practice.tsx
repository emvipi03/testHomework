import { useEffect, useRef, useState } from 'react'

const MAKECODE_URL = 'https://makecode.microbit.org/'

export function Practice({ brief, checklist, starterCode, onBack, onSubmit }: { brief: string; checklist: string[]; starterCode: string; onBack: () => void; onSubmit: () => void }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading')
  useEffect(() => {
    const ready = (event: MessageEvent) => {
      const editor = frame.current?.contentWindow
      if (event.source !== editor || !event.data) return
      if (event.data.type === 'pxthost' && event.data.action === 'workspacesync') {
        editor?.postMessage({ ...event.data, projects: [] }, '*')
      }
      if (event.data.type === 'pxthost' || event.data.type === 'pxteditor') setStatus('ready')
    }
    window.addEventListener('message', ready)
    const timer = window.setTimeout(() => setStatus((s) => s === 'loading' ? 'fallback' : s), 9000)
    return () => { window.removeEventListener('message', ready); clearTimeout(timer) }
  }, [])
  const loadStarter = () => {
    const editor = frame.current?.contentWindow
    if (!editor) return
    editor.postMessage({ type: 'pxteditor', id: crypto.randomUUID(), action: 'importproject', response: true, project: { text: { 'main.ts': starterCode, 'README.md': 'Bài thực hành nút A/B', 'pxt.json': JSON.stringify({ name: 'Nut A B va LED', dependencies: { core: '*' }, files: ['main.ts', 'README.md'] }) } } }, '*')
    window.setTimeout(() => editor.postMessage({ type: 'pxteditor', id: crypto.randomUUID(), action: 'switchblocks' }, '*'), 1200)
  }
  return <section className="page practice-page"><div className="practice-intro"><div><span className="kicker">Phòng lab MakeCode</span><h1>{brief}</h1><p className="honesty-note">Bài code tự do này <b>không được chấm tự động</b>. Em hãy dùng mô phỏng A/B để tự kiểm tra.</p></div><ol>{checklist.map((item) => <li key={item}>{item}</li>)}</ol></div>
    <div className="editor-shell"><div className="editor-toolbar"><span><i className={`status-dot ${status}`} />{status === 'ready' ? 'MakeCode đã kết nối' : status === 'fallback' ? 'Không nhận được phản hồi từ MakeCode' : 'Đang tải MakeCode…'}</span><div><button className="ghost" onClick={loadStarter}>Tạo bài trống</button><a className="external" href={MAKECODE_URL} target="_blank" rel="noreferrer">Mở MakeCode ở tab mới ↗</a></div></div>
      {status === 'fallback' && <div className="fallback"><b>Không thể xác nhận editor đã tải.</b><span>Phần MakeCode cần Internet và có thể bị chặn bởi mạng trường học. Em vẫn có thể mở trực tiếp ở tab mới.</span><a className="primary" href={MAKECODE_URL} target="_blank" rel="noreferrer">Mở MakeCode ↗</a></div>}
      <iframe ref={frame} title="Trình soạn thảo Microsoft MakeCode cho micro:bit" src={`${MAKECODE_URL}?controller=1&embed=1&lang=vi#editor`} onLoad={() => window.setTimeout(loadStarter, 1200)} allow="usb; serial; bluetooth; clipboard-read; clipboard-write" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-modals" />
    </div><div className="actions between"><button className="ghost" onClick={onBack}>← Xem lại câu hỏi</button><button className="primary submit" onClick={onSubmit}>Nộp bài và xem điểm</button></div>
  </section>
}

import { useEffect, useRef, useState } from 'react'

const MAKECODE_URL = 'https://makecode.microbit.org/'

export function Practice({ title, brief, checklist, starterCode, onBack, onSubmit }: { title: string; brief: string; checklist: string[]; starterCode: string; onBack: () => void; onSubmit: () => void }) {
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
    editor.postMessage({ type: 'pxteditor', id: crypto.randomUUID(), action: 'importproject', response: true, project: { text: { 'main.ts': starterCode, 'README.md': title, 'pxt.json': JSON.stringify({ name: title, dependencies: { core: '*' }, files: ['main.ts', 'README.md'] }) } } }, '*')
    window.setTimeout(() => editor.postMessage({ type: 'pxteditor', id: crypto.randomUUID(), action: 'switchblocks' }, '*'), 1200)
  }
  return <section className="page practice-page"><div className="practice-intro"><div><span className="kicker">MakeCode lab</span><h1>{brief}</h1><p className="honesty-note">This open coding task is <b>not automatically graded</b>. Use the A/B simulator buttons to test your own work.</p></div><ol>{checklist.map((item) => <li key={item}>{item}</li>)}</ol></div>
    <div className="editor-shell"><div className="editor-toolbar"><span><i className={`status-dot ${status}`} />{status === 'ready' ? 'MakeCode connected' : status === 'fallback' ? 'No response from MakeCode' : 'Loading MakeCode…'}</span><div><button className="ghost" onClick={loadStarter}>Load starter project</button><a className="external" href={MAKECODE_URL} target="_blank" rel="noreferrer">Open MakeCode in a new tab ↗</a></div></div>
      {status === 'fallback' && <div className="fallback"><b>We could not confirm that the editor loaded.</b><span>MakeCode needs Internet and may be blocked by a school network. You can still open it directly in a new tab.</span><a className="primary" href={MAKECODE_URL} target="_blank" rel="noreferrer">Open MakeCode ↗</a></div>}
      <iframe ref={frame} title="Microsoft MakeCode editor for micro:bit" src={`${MAKECODE_URL}?controller=1&embed=1&lang=en#editor`} onLoad={() => window.setTimeout(loadStarter, 1200)} allow="usb; serial; bluetooth; clipboard-read; clipboard-write" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-modals" />
    </div><div className="actions between"><button className="ghost" onClick={onBack}>← Review questions</button><button className="primary submit" onClick={onSubmit}>Submit and view results</button></div>
  </section>
}

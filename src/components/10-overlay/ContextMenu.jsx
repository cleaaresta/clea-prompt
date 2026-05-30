import { useState, useRef, useEffect } from 'react'

export default function ContextMenu({ trigger, items = [] }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const handleContextMenu = (e) => {
    e.preventDefault()
    setPos({ x: e.clientX, y: e.clientY })
    setOpen(true)
  }

  return (
    <div ref={ref} onContextMenu={handleContextMenu} style={{ display: 'inline-flex' }}>
      {trigger}
      {open && (
        <div style={{
          position: 'fixed', top: pos.y, left: pos.x,
          background: 'white', borderRadius: '12px',
          border: '1px solid #e5dfe8',
          boxShadow: '0 10px 30px rgba(98, 46, 146, 0.15)',
          zIndex: 3000, minWidth: '160px', overflow: 'hidden',
        }}>
          {items.map((item, i) => (
            <button key={i} onClick={() => { item.onClick?.(); setOpen(false) }} style={{
              display: 'block', width: '100%', padding: '10px 16px',
              border: 'none', background: 'none', textAlign: 'left',
              cursor: 'pointer', color: item.danger ? '#b92d40' : '#4b4b6d',
              fontSize: '0.9rem', transition: 'background 0.2s',
            }}
              onMouseEnter={(e) => e.target.style.background = '#f7f2fb'}
              onMouseLeave={(e) => e.target.style.background = 'none'}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

import { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="glamour-modal-overlay" onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(47, 35, 63, 0.4)',
      backdropFilter: 'blur(4px)', display: 'grid', placeItems: 'center',
      zIndex: 2000, padding: '20px',
    }}>
      <div className="glamour-modal" onClick={(e) => e.stopPropagation()} style={{
        background: 'white', borderRadius: '32px', padding: '32px',
        width: 'min(480px, 92vw)', boxShadow: '0 40px 120px rgba(128, 6, 103, 0.15)',
        maxHeight: '85vh', overflow: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontWeight: 700, color: '#2f233f' }}>{title}</h3>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: '1.4rem',
            cursor: 'pointer', color: '#a89fb8', padding: '4px',
          }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

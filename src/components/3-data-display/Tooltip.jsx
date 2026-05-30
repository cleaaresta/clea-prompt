import { useState } from 'react'

export default function Tooltip({ children, text, position = 'top' }) {
  const [visible, setVisible] = useState(false)

  const positionStyles = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '8px' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '8px' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '8px' },
  }

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className="glamour-tooltip"
          style={{
            position: 'absolute',
            ...positionStyles[position],
            padding: '8px 14px',
            background: '#2f233f',
            color: '#fff',
            borderRadius: '12px',
            fontSize: '0.85rem',
            whiteSpace: 'nowrap',
            zIndex: 1000,
            pointerEvents: 'none',
            boxShadow: '0 8px 24px rgba(47, 35, 63, 0.2)',
          }}
        >
          {text}
        </div>
      )}
    </div>
  )
}

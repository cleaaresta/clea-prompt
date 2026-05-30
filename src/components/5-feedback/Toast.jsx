import { useEffect, useState } from 'react'

export default function Toast({ message, variant = 'info', duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true)

  const colors = {
    info: { bg: '#eef2ff', color: '#3b4ac5' },
    success: { bg: '#f0fdf4', color: '#16a34a' },
    error: { bg: '#ffe6e8', color: '#b92d40' },
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      if (onClose) onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!visible) return null

  const style = colors[variant] || colors.info

  return (
    <div className="glamour-toast" style={{
      position: 'fixed', bottom: '24px', right: '24px', zIndex: 3000,
      padding: '16px 24px', borderRadius: '18px',
      background: style.bg, color: style.color,
      boxShadow: '0 12px 40px rgba(47, 35, 63, 0.15)',
      fontSize: '0.95rem', fontWeight: 600,
      animation: 'slideUp 0.3s ease',
    }}>
      {message}
    </div>
  )
}

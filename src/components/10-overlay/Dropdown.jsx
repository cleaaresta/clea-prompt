import { useState, useRef, useEffect } from 'react'

export default function Dropdown({ trigger, children, align = 'right' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div className="profile-dropdown" style={{
          position: 'absolute', top: 'calc(100% + 8px)',
          [align === 'right' ? 'right' : 'left']: 0,
        }}>
          {children}
        </div>
      )}
    </div>
  )
}

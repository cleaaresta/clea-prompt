export default function Drawer({ isOpen, onClose, title, children, position = 'right' }) {
  if (!isOpen) return null

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(47, 35, 63, 0.3)',
        zIndex: 2000, backdropFilter: 'blur(2px)',
      }} />
      <div style={{
        position: 'fixed', top: 0, bottom: 0,
        [position]: 0,
        width: 'min(380px, 85vw)',
        background: 'white',
        zIndex: 2001,
        boxShadow: '-20px 0 60px rgba(47, 35, 63, 0.15)',
        display: 'flex', flexDirection: 'column',
        transition: 'transform 0.3s ease',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '24px', borderBottom: '1px solid #e8e1ec',
        }}>
          <h3 style={{ margin: 0, fontWeight: 700, color: '#2f233f' }}>{title}</h3>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: '1.3rem',
            cursor: 'pointer', color: '#a89fb8',
          }}>✕</button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {children}
        </div>
      </div>
    </>
  )
}

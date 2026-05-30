export default function ToggleSwitch({ label, checked = false, onChange, name }) {
  return (
    <label className="glamour-toggle" style={{
      display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: '#4b4b6d'
    }}>
      <div
        onClick={() => onChange && onChange({ target: { name, checked: !checked } })}
        style={{
          width: '44px',
          height: '24px',
          borderRadius: '12px',
          background: checked
            ? 'linear-gradient(135deg, #e95dfd 0%, #fb878c 100%)'
            : '#e5dfe8',
          position: 'relative',
          transition: 'background 0.3s ease',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '2px',
            left: checked ? '22px' : '2px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'white',
            transition: 'left 0.3s ease',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}
        />
      </div>
      {label}
    </label>
  )
}

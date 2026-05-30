export default function Checkbox({ label, checked, onChange, name, className = '' }) {
  return (
    <label className={`glamour-checkbox ${className}`.trim()} style={{
      display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#4b4b6d'
    }}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
      />
      {label}
    </label>
  )
}

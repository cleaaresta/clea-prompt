export default function RememberMe({ checked = false, onChange }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      cursor: 'pointer', color: '#5f4e6d', fontSize: '0.9rem',
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
      />
      Remember me
    </label>
  )
}

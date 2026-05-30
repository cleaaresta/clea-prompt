import { useState } from 'react'

export default function PasswordField({ label = 'Password', name = 'password', value, onChange, placeholder, required = false }) {
  const [show, setShow] = useState(false)

  return (
    <label>
      {label}
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          style={{
            position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '1rem', color: '#a89fb8', padding: '4px',
          }}
        >
          {show ? '🙈' : '👁️'}
        </button>
      </div>
    </label>
  )
}

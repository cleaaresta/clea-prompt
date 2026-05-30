export default function Select({
  label,
  options = [],
  value,
  onChange,
  name,
  placeholder = 'Select an option',
  className = '',
  ...props
}) {
  return (
    <label className={className}>
      {label}
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          border: '1px solid #e5dfe8',
          borderRadius: '12px',
          padding: '12px 14px',
          background: '#fdfaff',
          fontSize: '0.95rem',
          color: '#4b3f5a',
          cursor: 'pointer',
        }}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  )
}

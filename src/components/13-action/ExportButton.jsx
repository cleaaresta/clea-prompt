export default function ExportButton({ onClick, label = 'Export Report' }) {
  return (
    <button className="button button-secondary button-sm" onClick={onClick} style={{
      background: 'rgba(123, 97, 196, 0.1)', color: '#7b61c4',
    }}>
      📤 {label}
    </button>
  )
}

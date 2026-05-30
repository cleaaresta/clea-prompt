export default function StatCard({ label, value, note, variant = 'pink' }) {
  const variantClass = `${variant}-card`

  return (
    <article className={`metric-card ${variantClass}`}>
      <p className="metric-label">{label}</p>
      <h2>{value}</h2>
      {note && <p className="metric-note">{note}</p>}
    </article>
  )
}

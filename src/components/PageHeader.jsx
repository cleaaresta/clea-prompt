export default function PageHeader({ title, subtitle }) {
  return (
    <div className="page-header">
      <div>
        <p className="eyebrow">Glamour Studio</p>
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </div>
      <div className="status-chip">Open today</div>
    </div>
  )
}

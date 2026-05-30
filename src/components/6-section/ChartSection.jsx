export default function ChartSection({ title, type = 'default', className = '' }) {
  const heightClass = type === 'large' ? 'chart-placeholder-large' : 'chart-placeholder'

  return (
    <section className={`panel ${className}`.trim()}>
      <div className="panel-title">{title}</div>
      <div className={heightClass}>Chart area</div>
    </section>
  )
}

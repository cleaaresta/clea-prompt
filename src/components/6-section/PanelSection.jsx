export default function PanelSection({ title, headerAction, children, className = '' }) {
  return (
    <section className={`panel ${className}`.trim()}>
      {(title || headerAction) && (
        <div className="panel-header">
          {title && <h3 className="panel-title">{title}</h3>}
          {headerAction}
        </div>
      )}
      {children}
    </section>
  )
}

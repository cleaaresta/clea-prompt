export default function PageHeaderSection({ title, subtitle, action }) {
  return (
    <div className="page-header-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
      <div>
        <h2 className="page-section-title" style={{ margin: 0, fontSize: '1.75rem', fontWeight: 600 }}>{title}</h2>
        {subtitle && <p className="page-section-text" style={{ margin: '4px 0 0 0', color: '#888' }}>{subtitle}</p>}
      </div>
      {action && (
        <div className="page-header-action" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {action}
        </div>
      )}
    </div>
  )
}

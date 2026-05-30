export default function PageHeaderSection({ title, subtitle }) {
  return (
    <div className="page-header-section">
      <h2 className="page-section-title">{title}</h2>
      <p className="page-section-text">{subtitle}</p>
    </div>
  )
}

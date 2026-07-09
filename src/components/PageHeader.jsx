export default function PageHeader({ title, subtitle }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </div>
    </div>
  )
}

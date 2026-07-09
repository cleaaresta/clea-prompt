export default function DashboardSection({ note, actions }) {
  return (
    <div className="dashboard-top">
      {note && (
        <div className="dashboard-intro">
          <p className="dashboard-note">{note}</p>
        </div>
      )}
      {actions && (
        <div className="dashboard-cta" style={!note ? { marginLeft: 'auto' } : {}}>
          {actions}
        </div>
      )}
    </div>
  )
}

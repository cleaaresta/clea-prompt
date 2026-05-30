export default function DashboardSection({ note, actions }) {
  return (
    <div className="dashboard-top">
      <div className="dashboard-intro">
        <p className="dashboard-note">{note}</p>
      </div>
      {actions && (
        <div className="dashboard-cta">
          {actions}
        </div>
      )}
    </div>
  )
}

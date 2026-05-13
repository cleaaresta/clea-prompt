import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="notfound-shell">
      <div className="notfound-card">
        <p className="eyebrow">404</p>
        <h1>Page Not Found</h1>
        <p className="subtitle">The page you are looking for does not exist.</p>
        <Link to="/admin" className="button button-primary">Go to dashboard</Link>
      </div>
    </div>
  )
}

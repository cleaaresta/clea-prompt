import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <Sidebar />
      <main className="admin-main">
        <Header />
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

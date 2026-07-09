import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const adminNavItems = [
  { label: "Dashboard", to: "/admin", icon: "📊" },
  { label: "Products", to: "/admin/products", icon: "💄" },
  { label: "Inventory", to: "/admin/inventory", icon: "📦" },
  { label: "Orders", to: "/admin/orders", icon: "📋" },
  { label: "Users", to: "/admin/users", icon: "👥" },
  { label: "Analytics", to: "/admin/analytics", icon: "📈" },
  { label: "Settings", to: "/admin/settings", icon: "⚙️" },
  { label: "React Hooks", to: "/admin/react-hooks", icon: "🪝" },
];

const memberNavItems = [
  { label: "Member Dashboard", to: "/member", icon: "📋" },
];

export default function Sidebar() {
  const { profile, signOut } = useAuth();
  const navItems = profile?.role
    ? profile.role === "member"
      ? memberNavItems
      : adminNavItems
    : [];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <aside className="sidebar">
      <div className="brand-card">
        <div className="brand-logo">💄</div>
        <div>
          <p className="brand-name">Glamour Studio</p>
          <p className="brand-subtitle">Beauty POS System</p>
        </div>
      </div>
      <nav className="main-nav">
        <p className="nav-section">Main Menu</p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/admin"}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button
          type="button"
          onClick={handleLogout}
          className="button button-secondary logout-button"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

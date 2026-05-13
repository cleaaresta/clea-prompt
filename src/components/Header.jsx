import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdown, setProfileDropdown] = useState(false)

  const handleLogout = () => {
    navigate('/login', { replace: true })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      setSearchQuery('')
    }
  }

  return (
    <header className="header-bar">
      <div className="header-left">
        <button 
          type="button" 
          className="hamburger-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">🔍</button>
        </form>
      </div>
      <div className="header-right">
        <div className="profile-section">
          <button 
            type="button"
            className="profile-button"
            onClick={() => setProfileDropdown(!profileDropdown)}
          >
            <div className="profile-avatar">👤</div>
            <div className="profile-info">
              <p className="profile-name">Admin</p>
              <p className="profile-role">Administrator</p>
            </div>
            <span className="dropdown-arrow">▼</span>
          </button>
          {profileDropdown && (
            <div className="profile-dropdown">
              <a href="#" className="dropdown-item">Profile Settings</a>
              <a href="#" className="dropdown-item">Account</a>
              <a href="#" className="dropdown-item">Preferences</a>
              <div className="dropdown-divider"></div>
              <button 
                type="button"
                className="dropdown-item logout-item"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

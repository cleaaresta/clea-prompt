export default function Settings() {
  return (
    <section>
      <div className="page-header-section">
        <h2 className="page-section-title">Settings</h2>
        <p className="page-section-text">Configure business options, store themes, and user preferences.</p>
      </div>
      <div className="settings-grid">
        <div className="panel">
          <h3 className="panel-title">Business Information</h3>
          <form className="settings-form">
            <label>
              Store Name
              <input type="text" value="Glamour Studio" />
            </label>
            <label>
              Email
              <input type="email" value="admin@glamourstudio.com" />
            </label>
            <label>
              Phone
              <input type="tel" value="+62 812 345 6789" />
            </label>
            <button type="submit" className="button button-primary">Save Changes</button>
          </form>
        </div>
        <div className="panel">
          <h3 className="panel-title">Account Settings</h3>
          <form className="settings-form">
            <label>
              Current Password
              <input type="password" placeholder="Enter current password" />
            </label>
            <label>
              New Password
              <input type="password" placeholder="Enter new password" />
            </label>
            <label>
              Confirm Password
              <input type="password" placeholder="Confirm new password" />
            </label>
            <button type="submit" className="button button-primary">Update Password</button>
          </form>
        </div>
        <div className="panel">
          <h3 className="panel-title">Preferences</h3>
          <div className="settings-checkbox">
            <label>
              <input type="checkbox" defaultChecked /> Enable email notifications
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Show low stock alerts
            </label>
            <label>
              <input type="checkbox" /> Dark mode
            </label>
          </div>
        </div>
        <div className="panel">
          <h3 className="panel-title">Danger Zone</h3>
          <p className="text-muted">These actions cannot be undone.</p>
          <button className="button button-danger">Delete Account</button>
        </div>
      </div>
    </section>
  )
}

import { Button } from '../components/1-basic'
import { Input, Checkbox } from '../components/4-form'
import { PageHeaderSection } from '../components/6-section'
import { PasswordField } from '../components/8-auth'
import { Caption } from '../components/14-typography'
import { FadeIn } from '../components/15-animation'

export default function Settings() {
  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="Settings"
          subtitle="Configure business options, store themes, and user preferences."
        />
      </FadeIn>
      <div className="settings-grid">
        <div className="panel">
          <h3 className="panel-title">Business Information</h3>
          <form className="settings-form">
            <Input label="Store Name" type="text" defaultValue="Glamour Studio" />
            <Input label="Email" type="email" defaultValue="admin@glamourstudio.com" />
            <Input label="Phone" type="tel" defaultValue="+62 812 345 6789" />
            <Button variant="primary" type="submit">Save Changes</Button>
          </form>
        </div>
        <div className="panel">
          <h3 className="panel-title">Account Settings</h3>
          <form className="settings-form">
            <PasswordField label="Current Password" placeholder="Enter current password" />
            <PasswordField label="New Password" name="new-password" placeholder="Enter new password" />
            <PasswordField label="Confirm Password" name="confirm-password" placeholder="Confirm new password" />
            <Button variant="primary" type="submit">Update Password</Button>
          </form>
        </div>
        <div className="panel">
          <h3 className="panel-title">Preferences</h3>
          <div className="settings-checkbox">
            <Checkbox label="Enable email notifications" defaultChecked />
            <Checkbox label="Show low stock alerts" defaultChecked />
            <Checkbox label="Dark mode" />
          </div>
        </div>
        <div className="panel">
          <h3 className="panel-title">Danger Zone</h3>
          <Caption>These actions cannot be undone.</Caption>
          <div style={{ marginTop: '16px' }}>
            <Button variant="danger">Delete Account</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

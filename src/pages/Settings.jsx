import React, { useState, useEffect } from 'react';
import { Button } from '../components/1-basic'
import { Input, Checkbox } from '../components/4-form'
import { PageHeaderSection } from '../components/6-section'
import { PasswordField } from '../components/8-auth'
import { Caption } from '../components/14-typography'
import { FadeIn } from '../components/15-animation'
import { useAuth } from '../context/AuthContext'

export default function Settings() {
  const { session } = useAuth();
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [businessInfo, setBusinessInfo] = useState({
    storeName: 'Glamour Studio',
    email: '',
    phone: '+62 812 345 6789'
  });

  const [passwordInfo, setPasswordInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (session?.user?.email) {
      setBusinessInfo(prev => ({ ...prev, email: session.user.email }));
    } else if (session?.email) {
      setBusinessInfo(prev => ({ ...prev, email: session.email }));
    }
  }, [session]);

  const handleBusinessChange = (e) => {
    const { name, value } = e.target;
    setBusinessInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordInfo(prev => ({ ...prev, [name]: value }));
  };

  const showToast = (message) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3000);
  };

  const handleSaveBusiness = (e) => {
    e.preventDefault();
    showToast('Business information saved successfully!');
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      showToast('New password and confirm password do not match!');
      return;
    }
    showToast('Password updated successfully!');
    setPasswordInfo({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="Settings"
          subtitle="Configure business options and account settings."
        />
      </FadeIn>
      
      {isToastVisible && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', backgroundColor: '#9a475d', 
          color: 'white', padding: '12px 24px', borderRadius: '8px', zIndex: 9999,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          {toastMessage}
        </div>
      )}

      <div className="settings-grid">
        <div className="panel">
          <h3 className="panel-title">Business Information</h3>
          <form className="settings-form" onSubmit={handleSaveBusiness}>
            <Input 
              label="Store Name" 
              type="text" 
              name="storeName"
              value={businessInfo.storeName} 
              onChange={handleBusinessChange}
            />
            <Input 
              label="Email" 
              type="email" 
              name="email"
              value={businessInfo.email} 
              onChange={handleBusinessChange}
            />
            <Input 
              label="Phone" 
              type="tel" 
              name="phone"
              value={businessInfo.phone} 
              onChange={handleBusinessChange}
            />
            <Button variant="primary" type="submit">Save Changes</Button>
          </form>
        </div>
        
        <div className="panel">
          <h3 className="panel-title">Account Settings</h3>
          <form className="settings-form" onSubmit={handleSavePassword}>
            <PasswordField 
              label="Current Password" 
              name="currentPassword"
              placeholder="Enter current password" 
              value={passwordInfo.currentPassword}
              onChange={handlePasswordChange}
            />
            <PasswordField 
              label="New Password" 
              name="newPassword" 
              placeholder="Enter new password" 
              value={passwordInfo.newPassword}
              onChange={handlePasswordChange}
            />
            <PasswordField 
              label="Confirm Password" 
              name="confirmPassword" 
              placeholder="Confirm new password" 
              value={passwordInfo.confirmPassword}
              onChange={handlePasswordChange}
            />
            <Button variant="primary" type="submit">Update Password</Button>
          </form>
        </div>
      </div>
    </section>
  )
}

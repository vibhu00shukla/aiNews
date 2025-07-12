import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Lock, LogOut, Save, Eye, EyeOff } from 'lucide-react';
import './Settings.css';

const Settings = ({ user, onLogout, onUpdatePreferences, onUpdatePassword }) => {
  const [selectedCategories, setSelectedCategories] = useState(user.preferences || []);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'science', label: 'Science' },
    { value: 'health', label: 'Health' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'sports', label: 'Sports' }
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleSavePreferences = async () => {
    if (selectedCategories.length === 0) {
      setMessage({ type: 'error', text: 'Please select at least one category' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      onUpdatePreferences(selectedCategories);
      setMessage({ type: 'success', text: 'Preferences updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update preferences' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
    setMessage({ type: '', text: '' });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters long' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await onUpdatePassword(passwordData.currentPassword, passwordData.newPassword);
      if (result.success) {
        setMessage({ type: 'success', text: result.message });
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setMessage({ type: 'error', text: result.message || 'Failed to update password' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while updating password' });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="settings-container">
      {/* Header */}
      <header className="settings-header">
        <div className="container">
          <div className="header-content">
            <Link to="/feed" className="back-button">
              <ArrowLeft className="back-icon" />
              Back to Feed
            </Link>
            
            <h1 className="settings-title">Settings</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="settings-main">
        <div className="container">
          <div className="settings-content">
            {/* User Info */}
            <div className="settings-section">
              <div className="section-header">
                <User className="section-icon" />
                <h2>Account Information</h2>
              </div>
              <div className="user-info">
                <div className="info-item">
                  <label>Name:</label>
                  <span>{user.name}</span>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <span>{user.email}</span>
                </div>
                <div className="info-item">
                  <label>Role:</label>
                  <span className={`role-badge ${user.isAdmin ? 'admin' : 'user'}`}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </div>
              </div>
            </div>

            {/* Category Preferences */}
            <div className="settings-section">
              <div className="section-header">
                <h2>News Categories</h2>
                <p>Select the categories you're interested in</p>
              </div>
              
              <div className="categories-grid">
                {categories.map(category => (
                  <label key={category.value} className="category-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.value)}
                      onChange={() => handleCategoryChange(category.value)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="category-label">{category.label}</span>
                  </label>
                ))}
              </div>

              <button
                onClick={handleSavePreferences}
                disabled={isLoading}
                className="btn btn-primary save-button"
              >
                <Save className="button-icon" />
                {isLoading ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>

            {/* Change Password */}
            <div className="settings-section">
              <div className="section-header">
                <Lock className="section-icon" />
                <h2>Change Password</h2>
              </div>
              
              <form onSubmit={handlePasswordSubmit} className="password-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="input"
                      placeholder="Enter current password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => togglePasswordVisibility('current')}
                    >
                      {showPasswords.current ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="input"
                      placeholder="Enter new password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => togglePasswordVisibility('new')}
                    >
                      {showPasswords.new ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="input"
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => togglePasswordVisibility('confirm')}
                    >
                      {showPasswords.confirm ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary"
                >
                  {isLoading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>

            {/* Logout */}
            <div className="settings-section">
              <div className="section-header">
                <LogOut className="section-icon" />
                <h2>Account Actions</h2>
              </div>
              
              <button
                onClick={onLogout}
                className="btn btn-danger logout-button"
              >
                <LogOut className="button-icon" />
                Logout
              </button>
            </div>

            {/* Message Display */}
            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings; 
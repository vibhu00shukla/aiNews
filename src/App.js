import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Feed from './components/Feed';
import ArticleDetail from './components/ArticleDetail';
import Settings from './components/Settings';
import PreferencesSetup from './components/PreferencesSetup';
import './App.css';

// Admin user credentials
const ADMIN_EMAIL = 'vibhu00shukla@gmail.com';
const ADMIN_PASSWORD = 'vibhu';

const ALL_CATEGORIES = ['technology', 'business', 'science', 'health', 'entertainment', 'sports'];

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      
      // Check if user needs to set preferences (new users without preferences)
      if (!userData.preferences || userData.preferences.length === 0) {
        setShowPreferences(true);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Check if it's admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = {
        email: ADMIN_EMAIL,
        name: 'Admin',
        isAdmin: true,
        preferences: ['technology', 'business', 'science', 'health', 'entertainment', 'sports']
      };
      setUser(adminUser);
      setShowPreferences(false);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return { success: true };
    }

    // For regular users, you would typically make an API call here
    // For now, we'll simulate a successful login
    const regularUser = {
      email: email,
      name: email.split('@')[0],
      isAdmin: false,
      preferences: ['technology', 'business']
    };
    setUser(regularUser);
    setShowPreferences(false);
    localStorage.setItem('user', JSON.stringify(regularUser));
    return { success: true };
  };

  const signup = (email, password, name) => {
    // For regular users, you would typically make an API call here
    // For now, we'll simulate a successful signup
    const newUser = {
      email: email,
      name: name,
      isAdmin: false,
      preferences: [] // Empty preferences to trigger setup
    };
    setUser(newUser);
    setShowPreferences(true); // Show preferences setup for new users
    localStorage.setItem('user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setShowPreferences(false);
    localStorage.removeItem('user');
  };

  const updateUserPreferences = (preferences) => {
    // If preferences is empty, set to all categories
    const updatedUser = { ...user, preferences: preferences.length === 0 ? ALL_CATEGORIES : preferences };
    setUser(updatedUser);
    setShowPreferences(false);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const updatePassword = (currentPassword, newPassword) => {
    // For admin user
    if (user.email === ADMIN_EMAIL && currentPassword === ADMIN_PASSWORD) {
      // In a real app, you'd make an API call to update the password
      return { success: true, message: 'Password updated successfully' };
    }
    
    // For regular users, you'd make an API call here
    return { success: true, message: 'Password updated successfully' };
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Remove direct rendering of PreferencesSetup here

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/feed" /> : <Login onLogin={login} />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/feed" /> : <Signup onSignup={signup} />} 
          />
          <Route 
            path="/feed" 
            element={user ? (showPreferences ? <Navigate to="/preferences-setup" /> : <Feed user={user} onLogout={logout} />) : <Navigate to="/login" />} 
          />
          <Route 
            path="/article/:id" 
            element={user ? (showPreferences ? <Navigate to="/preferences-setup" /> : <ArticleDetail user={user} onLogout={logout} />) : <Navigate to="/login" />} 
          />
          <Route 
            path="/settings" 
            element={user ? (showPreferences ? <Navigate to="/preferences-setup" /> : <Settings user={user} onLogout={logout} onUpdatePreferences={updateUserPreferences} onUpdatePassword={updatePassword} />) : <Navigate to="/login" />} 
          />
          <Route 
            path="/preferences-setup"
            element={user ? <PreferencesSetup user={user} onUpdatePreferences={updateUserPreferences} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={user ? (showPreferences ? "/preferences-setup" : "/feed") : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 
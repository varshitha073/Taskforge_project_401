import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import {
  updateProfile,
  updatePassword,
  deleteUser,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/Settings.css';

const Settings = ({ setTheme, currentTheme }) => {
  const [displayName, setDisplayName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user?.displayName) {
        setDisplayName(user.displayName);
      }
    });
    return () => unsubscribe();
  }, []);

  const reauthenticate = async () => {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );
    await reauthenticateWithCredential(currentUser, credential);
  };

  const handleUpdateProfile = async () => {
    if (!currentUser) return;
    try {
      await updateProfile(currentUser, { displayName });
      setAlertMsg('✅ Display name updated!');
    } catch (error) {
      console.error(error);
      setAlertMsg('❌ Failed to update display name.');
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentUser) return;

    if (!currentPassword) {
      setAlertMsg('❌ Please enter current password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setAlertMsg('❌ Passwords do not match.');
      return;
    }

    try {
      await reauthenticate();
      await updatePassword(currentUser, newPassword);
      setAlertMsg('🔐 Password updated!');
      setNewPassword('');
      setConfirmPassword('');
      setCurrentPassword('');
    } catch (error) {
      console.error(error);
      setAlertMsg('❌ Password update failed. Please check current password and try again.');
    }
  };

  const handleToggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setAlertMsg(`🌗 Theme changed to ${newTheme}`);
  };

  const handleDeleteAccount = async () => {
    if (!currentUser) return;

    if (!currentPassword) {
      setAlertMsg('❌ Please enter your current password before deleting your account.');
      return;
    }

    const confirmDelete = window.confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.');
    if (!confirmDelete) return;

    try {
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      await deleteUser(currentUser);
      alert('🗑️ Account deleted successfully.');
      navigate('/register');
    } catch (error) {
      console.error('Account deletion error:', error);

      if (error.code === 'auth/wrong-password') {
        setAlertMsg('❌ Incorrect password. Please try again.');
      } else if (error.code === 'auth/requires-recent-login') {
        setAlertMsg('❌ Please re-login and try deleting your account again.');
      } else {
        setAlertMsg('❌ Could not delete account. Please try again.');
      }
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          ←
        </button>

        <h2>⚙️ Settings</h2>

        {alertMsg && <div className="alert-message">{alertMsg}</div>}

        <div className="setting-item">
          <label>Display Name</label>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={handleUpdateProfile}>Update Name</button>
        </div>

        <div className="setting-item">
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
        </div>

        <div className="setting-item">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        <div className="setting-item">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
          />
          <button onClick={handleUpdatePassword}>Update Password</button>
        </div>

        <div className="setting-item">
          <label>Theme</label>
          <button onClick={handleToggleTheme}>
            Switch to {currentTheme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
          </button>
        </div>

        <div className="setting-item danger-zone">
          <label>Danger Zone</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password to delete account"
          />
          <button className="danger" onClick={handleDeleteAccount}>
            🗑️ Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

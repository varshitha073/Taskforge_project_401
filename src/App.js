import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [user, setUser] = useState(undefined); 
  const [theme, setTheme] = useState('light');

  // 🔒 Monitor Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("🔥 Auth state changed:", currentUser);
      setUser(currentUser ?? null); 
    });
    return () => unsubscribe();
  }, []);

  // 🌗 Load theme from localStorage on first load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // 💡 Update body class when theme changes
  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 🔄 While checking login status (initial render)
  if (user === undefined) return <h1 style={{ textAlign: 'center' }}>⏳ Checking authentication...</h1>;

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Welcome />} />

        {/* Sign Up Routes */}
        <Route path="/signup" element={<Register />} />
        <Route path="/register" element={<Register />} />

        {/* Login */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />

        {/* Protected Dashboard */}
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />

        {/* Protected Settings */}
        <Route
          path="/settings"
          element={user ? <Settings currentTheme={theme} setTheme={setTheme} /> : <Navigate to="/login" />}
        />

        {/* Optional: Test route */}
        <Route path="/test" element={<h1>✅ Test page working</h1>} />
      </Routes>
    </Router>
  );
};

export default App;

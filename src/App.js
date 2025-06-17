import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import About from './pages/About';       // 🔹 NEW
import Features from './pages/Features'; // 🔹 NEW
import Contact from './pages/Contact';   // 🔹 NEW
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 🔐 Reusable PrivateRoute component
const PrivateRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  const [user, setUser] = useState(undefined);
  const [theme, setTheme] = useState('light');

  // 🔥 Firebase Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("🔥 Auth state changed:", currentUser);
      setUser(currentUser ?? null);
    });
    return () => unsubscribe();
  }, []);

  // 🎨 Load & apply theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // ⏳ Wait until auth check is complete
  if (user === undefined)
    return <h1 style={{ textAlign: 'center' }}>⏳ Checking authentication...</h1>;

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />

        {/* New Static Info Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute user={user}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute user={user}>
              <Settings currentTheme={theme} setTheme={setTheme} />
            </PrivateRoute>
          }
        />

        {/* Optional Test Route */}
        <Route path="/test" element={<h1>✅ Test page working</h1>} />
      </Routes>
    </Router>
  );
};

export default App;

import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);

      if (err.code === "auth/user-not-found") {
        setError("❌ This email is not registered. Redirecting to register...");
        console.log("⏳ Navigating to /register in 2s...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("➡️ Redirecting now...");
        navigate("/register");
      } else if (err.code === "auth/wrong-password") {
        setError("❌ Incorrect password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("❌ Invalid email format.");
      } else {
        setError("❌ Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError("❌ Google Sign-In failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>🔐 Welcome Back</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="🔑 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="google-btn"
        disabled={loading}
      >
        🔵 Sign in with Google
      </button>

      <p onClick={() => navigate("/register")} className="switch-link">
        ✨ New user? Create an account
      </p>
    </div>
  );
};

export default Login;

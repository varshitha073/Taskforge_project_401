import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("📝 Register page mounted.");
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("🎉 Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration Error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("❌ Email already in use. Try logging in.");
      } else if (err.code === "auth/invalid-email") {
        setError("❌ Invalid email format.");
      } else if (err.code === "auth/weak-password") {
        setError("❌ Password should be at least 6 characters.");
      } else {
        setError("❌ Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError("❌ Google Sign-In failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>📝 Create Account</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleRegister}>
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
          placeholder="🔑 Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>

      <button onClick={handleGoogleSignup} className="google-btn" disabled={loading}>
        🔵 Sign up with Google
      </button>

      <p onClick={() => navigate("/login")} className="switch-link">
        🔐 Already have an account? Login
      </p>
    </div>
  );
};

export default Register;

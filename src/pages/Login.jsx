import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { toast } from "react-toastify";

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
    console.log("🟡 Attempting login with:", email);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Login successful. Redirecting to dashboard...");
      toast.success("🎉 Login successful!", {
        autoClose: 3000,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Login Error:", err);
      console.log("Firebase Error Code:", err.code);

      switch (err.code) {
        case "auth/user-not-found":
        case "auth/invalid-login-credentials":
          setError("❌ Email not registered. Redirecting to register page...");
          toast.info("ℹ️ Email not registered. Redirecting...", {
            autoClose: 3000,
          });
          setTimeout(() => {
            navigate("/register");
          }, 2000);
          break;
        case "auth/wrong-password":
          setError("❌ Incorrect password. Please try again.");
          toast.error("🚫 Incorrect password.", { autoClose: 3000 });
          break;
        case "auth/invalid-email":
          setError("❌ Invalid email format.");
          toast.error("🚫 Invalid email format.", { autoClose: 3000 });
          break;
        case "auth/too-many-requests":
          setError("❌ Too many failed attempts. Please try again later.");
          toast.warn("⚠️ Too many attempts. Try later.", { autoClose: 3000 });
          break;
        default:
          setError("❌ Unexpected error: " + err.message);
          toast.error("⚠️ Unexpected error: " + err.message, {
            autoClose: 3000,
          });
          break;
      }
    } finally {
      setLoading(false);
      console.log("🔄 Login process complete.");
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
        className="register-button"
        onClick={() => {
          console.log("➡️ Manually navigating to /register");
          toast.info("🚀 Redirecting to Register...", { autoClose: 2000 });
          navigate("/register");
        }}
        disabled={loading}
      >
        ✨ New user? Create an account
      </button>
    </div>
  );
};

export default Login;

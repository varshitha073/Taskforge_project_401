import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { toast } from "react-toastify";

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
    console.log("🟢 Attempting registration with:", email);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("🎉 Account created successfully!", {
        autoClose: 3000,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
      });
      console.log("✅ Account created. Redirecting to dashboard...");
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Registration Error:", err);

      switch (err.code) {
        case "auth/email-already-in-use":
          setError("❌ Email already in use. Try logging in.");
          toast.error("🚫 Email already in use.", { autoClose: 3000 });
          break;
        case "auth/invalid-email":
          setError("❌ Invalid email format.");
          toast.error("🚫 Invalid email format.", { autoClose: 3000 });
          break;
        case "auth/weak-password":
          setError("❌ Password should be at least 6 characters.");
          toast.error("⚠️ Weak password. Use at least 6 characters.", {
            autoClose: 3000,
          });
          break;
        default:
          setError("❌ Registration failed. Please try again.");
          toast.error("⚠️ Something went wrong. Please try again.", {
            autoClose: 3000,
          });
          break;
      }
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

      <p
        onClick={() => {
          console.log("➡️ Navigating to /login");
          toast.info("🔐 Redirecting to Login...", { autoClose: 2000 });
          navigate("/login");
        }}
        className="switch-link"
      >
        🔐 Already have an account? Login
      </p>
    </div>
  );
};

export default Register;

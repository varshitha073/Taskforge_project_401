import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";

const useGoogleLogin = () => {
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard"); // ✅ Navigate to dashboard
    } catch (err) {
      alert("Google sign-in failed: " + err.message);
    }
  };

  return login;
};

export default useGoogleLogin;

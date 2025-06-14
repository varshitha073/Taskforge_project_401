import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";

// ✅ This is a valid custom hook
const useGoogleLogin = () => {
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/Login");
    } catch (err) {
      alert("Google sign-in failed: " + err.message);
    }
  };

  return login;
};

export default useGoogleLogin;

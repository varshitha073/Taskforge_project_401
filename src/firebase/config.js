import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBqQ272r0YKg93eM6VWLe1BNxR-UFZYYbw",
  authDomain: "taskforge-e304f.firebaseapp.com",
  projectId: "taskforge-e304f",
  storageBucket: "taskforge-e304f.appspot.com",
  messagingSenderId: "260039066518",
  appId: "1:260039066518:web:0cebca7cf2505ce59c53b7",
  measurementId: "G-2ZJENB20M1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

export { auth, db, messaging, getToken, onMessage };

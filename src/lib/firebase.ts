import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC1qZ9fK-6LFBxVWZsAD4dZq-KVg36A7f8",
  authDomain: "scheduler-65e51.firebaseapp.com",
  projectId: "scheduler-65e51",
  storageBucket: "scheduler-65e51.firebasestorage.app",
  messagingSenderId: "595974749655",
  appId: "1:595974749655:web:sharptech",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

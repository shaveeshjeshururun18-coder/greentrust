import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase configuration
// This file was restored as it was found missing.
const firebaseConfig = {
  apiKey: "PLACEHOLDER_API_KEY",
  authDomain: "greentrust-placeholder.firebaseapp.com",
  projectId: "greentrust-placeholder",
  storageBucket: "greentrust-placeholder.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000000000"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCo9_kgb-U57-Y45V8AdzYwGh7pKGYegPk",
    authDomain: "green-trust-56704.firebaseapp.com",
    projectId: "green-trust-56704",
    storageBucket: "green-trust-56704.firebasestorage.app",
    messagingSenderId: "995571800092",
    appId: "1:995571800092:web:f9ac8714e75b5363ec27d9",
    measurementId: "G-X0HLBSZGYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

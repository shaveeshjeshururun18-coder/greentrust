import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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
export const googleProvider = new GoogleAuthProvider();

import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Initialize App Check
// Use standard dev/prod environment logic or just enable it. 
// Note: You need to register this site key in Firebase Console -> App Check -> reCAPTCHA v3
if (typeof window !== 'undefined') {
    // Enable debug token for localhost development
    // @ts-ignore
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;

    // @ts-ignore - self is a restricted global in some contexts but fine here
    // eslint-disable-next-line
    const appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider('6Lcc6TosAAAAABGMPBXJ5wZTzbu7gMMD2GVb24CC'),
        isTokenAutoRefreshEnabled: true
    });
}

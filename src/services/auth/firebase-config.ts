import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { ReactNativeAsyncStorage } from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmfXZtHpDVGnb_sjf0YT49k4XNb0Mn4yQ",
  authDomain: "petgato-app.firebaseapp.com",
  projectId: "petgato-app",
  storageBucket: "petgato-app.firebasestorage.app",
  messagingSenderId: "3143920171",
  appId: "1:3143920171:web:44eacfdb7abf2266f0986e",
  measurementId: "G-RK4RLK8EJR"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) });
const db = getFirestore(app);

export { app, auth, db };

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseAppletConfig from '../firebase-applet-config.json';

export const firebaseConfig = {
  projectId: firebaseAppletConfig.projectId || "chua-sport-core",
  appId: firebaseAppletConfig.appId || "1:448424125158:web:c472e23f4b78febb661127",
  apiKey: firebaseAppletConfig.apiKey || "AIzaSyAXd9BEbKOD-tbgFSjcvZuedwG_6bekK44",
  authDomain: firebaseAppletConfig.authDomain || "chua-sport-core.firebaseapp.com",
  firestoreDatabaseId: firebaseAppletConfig.firestoreDatabaseId || "ai-studio-chuasportcorespo-a3f4ecd8-7371-486a-9e89-d74d93ce6065",
  storageBucket: firebaseAppletConfig.storageBucket || "chua-sport-core.firebasestorage.app",
  messagingSenderId: firebaseAppletConfig.messagingSenderId || "448424125158"
};

// Inisialisasi Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Inisialisasi Firestore dengan mengarah HANYA ke database khusus ERP
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export { app, db };
export default db;

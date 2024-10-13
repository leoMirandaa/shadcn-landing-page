import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: "cerebral-3a996",
  storageBucket: "cerebral-3a996.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: "G-RY2JDSH6ZF",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
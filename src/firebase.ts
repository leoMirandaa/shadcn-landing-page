import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJUo_R3lRPYGy22LhyZhJbGDKNZNPYCQw",
  authDomain: "cerebral-3a996.firebaseapp.com",
  projectId: "cerebral-3a996",
  storageBucket: "cerebral-3a996.appspot.com",
  messagingSenderId: "235307067436",
  appId: "1:235307067436:web:cc88447810d6d5108c8989",
  measurementId: "G-RY2JDSH6ZF",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
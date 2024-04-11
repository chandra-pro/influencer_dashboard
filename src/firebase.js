import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

 const firebaseConfig = {
  apiKey: "AIzaSyC7KlpeFccmbyVZCflF4rsQmgBadjYibS8",
  authDomain: "buybold-2efd2.firebaseapp.com",
  databaseURL: "https://buybold-2efd2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "buybold-2efd2",
  storageBucket: "buybold-2efd2.appspot.com",
  messagingSenderId: "352772504050",
  appId: "1:352772504050:web:a144f21fcb016f8da9536b",
  measurementId: "G-5ER770FBVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
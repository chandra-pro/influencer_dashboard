import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCo5nLTDfzuR8GXJrdRoSiCeZ_FQs9Tzz4",
  authDomain: "buybold-2efd2.firebaseapp.com",
  databaseURL: "https://buybold-2efd2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "buybold-2efd2",
  storageBucket: "buybold-2efd2.appspot.com",
  messagingSenderId: "352772504050",
  appId: "1:352772504050:web:c762699075b8e327a9536b",
  measurementId: "G-HMMQZJYGHK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
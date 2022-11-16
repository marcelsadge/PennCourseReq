import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD7a0piG8N5ZQshKw68q5GUU_BM8J_6oCc",
    authDomain: "penn-rec-ed5be.firebaseapp.com",
    projectId: "penn-rec-ed5be",
    storageBucket: "penn-rec-ed5be.appspot.com",
    messagingSenderId: "422778170011",
    appId: "1:422778170011:web:6e6de9eb6770ba2889343e",
    measurementId: "G-5GDHJLGJ74"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
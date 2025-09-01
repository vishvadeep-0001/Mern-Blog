// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-c5c81.firebaseapp.com",
  projectId: "mern-blog-c5c81",
  storageBucket: "mern-blog-c5c81.firebasestorage.app",
  messagingSenderId: "952067808305",
  appId: "1:952067808305:web:234f24f4a816f2f74d8910"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);



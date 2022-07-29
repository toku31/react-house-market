import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoMlwtmCorlhRB0Hwwrgi3CwmKns9p7Ho",
  authDomain: "house-marketpalce-app-9e335.firebaseapp.com",
  projectId: "house-marketpalce-app-9e335",
  storageBucket: "house-marketpalce-app-9e335.appspot.com",
  messagingSenderId: "88258103478",
  appId: "1:88258103478:web:a7931dbd9a7e672d7c3e17"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
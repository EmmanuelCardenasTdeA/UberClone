// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkjz2mr3yUXYMK1HVBOA0yynvLPFZdCRE",
  authDomain: "consumoapi-f84db.firebaseapp.com",
  projectId: "consumoapi-f84db",
  storageBucket: "consumoapi-f84db.firebasestorage.app",
  messagingSenderId: "187382199288",
  appId: "1:187382199288:web:9db9250ebc19017cd95c0d",
  measurementId: "G-PM534PHXBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
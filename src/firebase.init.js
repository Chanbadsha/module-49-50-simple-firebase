// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs_6nrdkWRsZW6pOJhQATl_hGUqGf2f7w",
  authDomain: "simple-firebase-17bed.firebaseapp.com",
  projectId: "simple-firebase-17bed",
  storageBucket: "simple-firebase-17bed.firebasestorage.app",
  messagingSenderId: "113163886200",
  appId: "1:113163886200:web:d878e201d6b7d24d68178d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
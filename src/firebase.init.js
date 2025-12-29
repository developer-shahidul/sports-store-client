// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyA8ZxrT2NA_LooOOOHGKb_BkHhZjh9Fo",
  authDomain: "sports-store-client.firebaseapp.com",
  projectId: "sports-store-client",
  storageBucket: "sports-store-client.firebasestorage.app",
  messagingSenderId: "336424862424",
  appId: "1:336424862424:web:220a058105baa7cd328dad",
  measurementId: "G-CW0QH0ZTTJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;

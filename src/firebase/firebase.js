// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBQWl-QSZtwKNeYNgzTnzV84A8DlLeZfFU",
    authDomain: "ecommerce-784b3.firebaseapp.com",
    projectId: "ecommerce-784b3",
    storageBucket: "ecommerce-784b3.firebasestorage.app",
    messagingSenderId: "837167011860",
    appId: "1:837167011860:web:d3d348d5e5dcbb19ed2f01",
    measurementId: "G-4F0N5184YZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
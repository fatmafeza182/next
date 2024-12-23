// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyM-6y0jx3gsHDe4J3AFHTS0Q6DMEbSbM",
    authDomain: "next-4e087.firebaseapp.com",
    projectId: "next-4e087",
    storageBucket: "next-4e087.firebasestorage.app",
    messagingSenderId: "217795604163",
    appId: "1:217795604163:web:8d5b8a3a1efbc9fab87c76",
    measurementId: "G-1CCQYMZ42W"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);


export default firebaseapp
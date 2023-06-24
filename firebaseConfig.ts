// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'verve-513ff.firebaseapp.com',
  projectId: 'verve-513ff',
  storageBucket: 'verve-513ff.appspot.com',
  messagingSenderId: '703107708284',
  appId: '1:703107708284:web:c0a000abee34e24230e0f9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

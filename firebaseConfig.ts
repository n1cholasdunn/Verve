import {initializeApp} from 'firebase/app';
import 'dotenv/config';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: 'verve-d99d7',
  storageBucket: 'verve-d99d7.appspot.com',
  messagingSenderId: '97711789160',
  appId: '1:97711789160:web:71fc9a233f6bbba5e3d7dd',
  measurementId: 'G-VB4ETL6L4N',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from '@firebase/firestore';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {FIREBASE_API_KEY} from '@env';

console.log(process.env.FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'verve-513ff.firebaseapp.com',
  projectId: 'verve-513ff',
  storageBucket: 'verve-513ff.appspot.com',
  messagingSenderId: '703107708284',
  appId: '1:703107708284:web:c0a000abee34e24230e0f9',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtiddAN8qX239bO-90pEwkI2LFqj26Ikw",
  authDomain: "food-recordy.firebaseapp.com",
  projectId: "food-recordy",
  storageBucket: "food-recordy.appspot.com",
  messagingSenderId: "333618300131",
  appId: "1:333618300131:web:156cb9ba5e35324a8fb1d6",
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firebase Storage for Image keeping
export const imgStore = getStorage(app);

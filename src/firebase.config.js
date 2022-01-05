import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDbgChIVRswKM9RuGCCeL5DgcbnvHORQL4",
  authDomain: "real-estate-app-29ef2.firebaseapp.com",
  projectId: "real-estate-app-29ef2",
  storageBucket: "real-estate-app-29ef2.appspot.com",
  messagingSenderId: "769777694656",
  appId: "1:769777694656:web:e5a3b4c2b9998fb18f3a25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

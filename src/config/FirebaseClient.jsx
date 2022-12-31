import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "taskati-b8379.firebaseapp.com",
  projectId: "taskati-b8379",
  storageBucket: "taskati-b8379.appspot.com",
  messagingSenderId: "360498861783",
  appId: "1:360498861783:web:2253de066ce73a69c80292",
  measurementId: "G-EWBVX47LS5"
};

const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const firestore = getFirestore(firebase);
const storage = getStorage(firebase);
const auth = getAuth(firebase);

export default firebase;
export {analytics, firestore, storage, auth};
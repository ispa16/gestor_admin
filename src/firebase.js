import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA-tyzwAagL9o2NcLySJS3q1Pe12ilwjyI",
  authDomain: "crud-investigacion-5fae0.firebaseapp.com",
  projectId: "crud-investigacion-5fae0",
  storageBucket: "crud-investigacion-5fae0.appspot.com",
  messagingSenderId: "131785430421",
  appId: "1:131785430421:web:091c79bbdf7f3139e7d29c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);

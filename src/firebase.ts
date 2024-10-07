import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCZ2kWJiHUJZ9nxnNFBf7Lj8AjUt8aYB_w",
  authDomain: "gaeldeco-98fcb.firebaseapp.com",
  projectId: "gaeldeco-98fcb",
  storageBucket: "gaeldeco-98fcb.appspot.com",
  messagingSenderId: "748823492792",
  appId: "1:748823492792:web:feaa81834310704cefdc4d",
  measurementId: "G-9J1X8JLD2B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export { analytics };
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcBMAQcA2VkfOFUS6toxpx4zbFLJOKgwA",
  authDomain: "tcl-61-smart-shopping-list.firebaseapp.com",
  projectId: "tcl-61-smart-shopping-list",
  storageBucket: "tcl-61-smart-shopping-list.appspot.com",
  messagingSenderId: "103429211108",
  appId: "1:103429211108:web:2e5a2dc705c12c415efdf1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

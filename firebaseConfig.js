import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCibyzxoI3LaWPYv4OFYKQnSWupzbdO_pw",
  authDomain: "weatherscooppe.firebaseapp.com",
  projectId: "weatherscooppe",
  storageBucket: "weatherscooppe.firebasestorage.app",
  messagingSenderId: "8911032243",
  appId: "1:8911032243:web:7b1b820853de96eb7545c6"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app); 
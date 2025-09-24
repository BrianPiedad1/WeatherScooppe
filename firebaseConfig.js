import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // 👈 add this

const firebaseConfig = {
  apiKey: "AIzaSyCibyzxoI3LaWPYv4OFYKQnSWupzbdO_pw",
  authDomain: "weatherscooppe.firebaseapp.com",
  projectId: "weatherscooppe",
  storageBucket: "weatherscooppe.appspot.com", // 👈 fix bucket domain
  messagingSenderId: "8911032243",
  appId: "1:8911032243:web:7b1b820853de96eb7545c6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // 👈 export storage

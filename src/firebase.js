import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDkhZfRVHW8MrHTICPYN-Osf3aP9wcMq9I",
  authDomain: "instagram-clone-27aa1.firebaseapp.com",
  projectId: "instagram-clone-27aa1",
  storageBucket: "instagram-clone-27aa1.appspot.com",
  messagingSenderId: "442419800512",
  appId: "1:442419800512:web:74d2ff7925e554190cc025",
  measurementId: "G-QE2T2JJG45",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

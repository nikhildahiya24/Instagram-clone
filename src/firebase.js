import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAR2c3msbCEFOeA4zT0W_YXSbaCkyVBdNY",
  authDomain: "instagramclone-ca50e.firebaseapp.com",
  projectId: "instagramclone-ca50e",
  storageBucket: "instagramclone-ca50e.appspot.com",
  messagingSenderId: "827765025215",
  appId: "1:827765025215:web:4aef68bea82888258c990a",
  measurementId: "G-9Y2C43EGCC"
  
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

//
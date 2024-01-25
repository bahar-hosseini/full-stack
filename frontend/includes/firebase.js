import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBwfctz_mBfJ0a22cE7VMd7YJKBsT3Vtds",
  authDomain: "patient-file-manager-6952b.firebaseapp.com",
  projectId: "patient-file-manager-6952b",
  storageBucket: "patient-file-manager-6952b.appspot.com",
  messagingSenderId: "871742132607",
  appId: "1:871742132607:web:6a6bcbd28cfb7244b4ca4a",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const db = firebase.firestore();
const filesCollection = db.collection("files");


export {
  storage,
  filesCollection
};

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, onSnapshot, collection, addDoc, getDocs, where, query,doc, getDoc} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4DsmmjeLttSoqU66FfK2ZNi0XtRQ0v4M",
  authDomain: "hello-666d6.firebaseapp.com",
  projectId: "hello-666d6",
  storageBucket: "hello-666d6.appspot.com",
  messagingSenderId: "30758359302",
  appId: "1:30758359302:web:ac778ffeffc73271dbce87",
  measurementId: "G-DVWF17HZJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

const auth = getAuth();
const db = getFirestore();
const userRef = collection(db, 'user')
const addFormDataRef = collection(db, 'addFormDataRef')
const restaurantForm = collection(db, 'restaurantForms')
const  userData= collection(db, 'userData')
const  userRef3= collection(db, 'userRef3')
const   userRef4= collection(db, ' userRef4')

const AddDishes = collection(db, 'AddDishes')

const eventRef = collection(db, 'events')
const storage = getStorage()

export {
  signInWithPopup, GoogleAuthProvider,provider,
  auth,getAuth,
  onAuthStateChanged,
  addDoc, getDocs,
  where, query,
  getStorage, ref,
  storage,
  getDownloadURL,
  eventRef,
  onSnapshot,
  userRef,
  signOut, uploadBytes,
  signInWithEmailAndPassword, createUserWithEmailAndPassword,addFormDataRef,restaurantForm, userData,AddDishes
,userRef3, getDoc,collection, db, userRef4, doc 


}












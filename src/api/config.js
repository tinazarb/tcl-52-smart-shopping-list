import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyAZVQ1G9CBFXBCp0aNTwvt4ojle0JHX4",
  authDomain: "tcl-52-smart-shopping-list.firebaseapp.com",
  projectId: "tcl-52-smart-shopping-list",
  storageBucket: "tcl-52-smart-shopping-list.appspot.com",
  messagingSenderId: "380992563508",
  appId: "1:380992563508:web:0a2c04044d26bd83b79d61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

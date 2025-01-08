
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAcWTyUlJx06C6bG7CrD1TQKax65K-pg-o",
  authDomain: "miniblog-893d9.firebaseapp.com",
  projectId: "miniblog-893d9",
  storageBucket: "miniblog-893d9.firebasestorage.app",
  messagingSenderId: "1015342990034",
  appId: "1:1015342990034:web:02d3a0dee5c0e824b8230b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }
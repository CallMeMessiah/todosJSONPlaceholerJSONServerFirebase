// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChZKqom1VlmZfDhWf3FrJHXqgdrroOlTI",
  authDomain: "todosproject-b80db.firebaseapp.com",
  projectId: "todosproject-b80db",
  storageBucket: "todosproject-b80db.firebasestorage.app",
  messagingSenderId: "933226749639",
  appId: "1:933226749639:web:276c7e635734432b4068e2",
  databaseURL:
    "https://todosproject-b80db-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

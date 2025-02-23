import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDBiTy40j5q4rmWLowF4AThP722FTiBpgs",
  authDomain: "react-chat-app-8137b.firebaseapp.com",
  databaseURL: "https://react-chat-app-8137b-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-8137b",
  storageBucket: "react-chat-app-8137b.appspot.com",
  messagingSenderId: "444515568534",
  appId: "1:444515568534:web:6b8fb3cbe2ef96a30d2bb7"
};


const app = initializeApp(firebaseConfig);


const database = getDatabase(app);

export { app, database };

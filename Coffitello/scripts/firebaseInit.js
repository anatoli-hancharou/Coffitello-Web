import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmuXbznj1SdsA_TtHvNHUxdn1QeZIlRrg",
  authDomain: "coctaillio.firebaseapp.com",
  projectId: "coctaillio",
  storageBucket: "coctaillio.appspot.com",
  appId: "1:460357706580:web:076c9fe95133b60039dec1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase();
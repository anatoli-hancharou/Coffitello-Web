import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { onNavigate } from "./router.js";
import { auth } from "../scripts/firebaseInit.js";

class AuthService {
  async isAuthorized() {
    return await initializeAuth.then(result => result != null);
  }
 
  signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        onNavigate('/');
        const user = userCredential.user;
      })
      .catch((error) => {
        var errorCode = error.code;
        if (errorCode == "auth/user-not-found") {
          alert("We can't find user with this email address...");
        } else if (errorCode == "auth/wrong-password"){
          alert("Password is wrong. Please, try again.");
        } else if (errorCode == "auth/invalid-email") {
          alert("The email address is not valid.");
        }
      });
  }

  signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        onNavigate('/');
        const user = userCredential.user;
      })
      .catch((error) => {
        var errorCode = error.code;
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else if (errorCode == "auth/email-already-in-use"){
          alert("Oops... This email is already in use.");
        } else if (errorCode == "auth/invalid-email") {
          alert("The email address is not valid.");
        }
      });
  }

  signOut() {
    signOut(auth).then(() => {
      onNavigate('/');
    }).catch((error) => {
      console.log(error.message)
    });
  }
}

const initializeAuth = new Promise(resolve => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      showMenuForUnauthorizedUser();
    } else {
      showMenuForAuthorizedUser();
    }
    resolve(user);
  })
});

function showMenuForAuthorizedUser() {
  document.getElementById('signup-link').classList.remove("hidden");
  document.getElementById('login-link').classList.remove("hidden");
  document.getElementById('logout-link').setAttribute("class", "hidden");
  document.getElementById('bar-link').setAttribute("class", "hidden");
  document.getElementById('create-link').setAttribute("class", "hidden");
}

function showMenuForUnauthorizedUser() {
  document.getElementById('signup-link').setAttribute("class", "hidden");
  document.getElementById('login-link').setAttribute("class", "hidden");
  document.getElementById('bar-link').classList.remove("hidden");
  document.getElementById('logout-link').classList.remove("hidden");
  document.getElementById('create-link').classList.remove("hidden");
}

export const authService = new AuthService();
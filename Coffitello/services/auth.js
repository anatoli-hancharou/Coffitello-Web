import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { onNavigate } from "./router.js";
import { auth } from "../scripts/firebaseInit.js";
import { Toast } from "./alert.js";

class AuthService {
  constructor() {
    this.user = null;
  }

  async isAuthorized() {
    let auth = this;
    return await checkAuth.then(() => {
      return auth.user != null;
    })
  }
 
  signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        onNavigate('/');
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        });
        this.user = userCredential.user;
      })
      .catch((error) => {
        let errorCode = error.code;
        if (errorCode == "auth/user-not-found") {
          Toast.fire({
            icon: 'error',
            title: "User not found!"
          });
        } else if (errorCode == "auth/wrong-password") {
          Toast.fire({
            icon: 'error',
            title: 'Password is wrong.\n Please, try again.'
          });
        } else if (errorCode == "auth/invalid-email") {
          Toast.fire({
            icon: 'error',
            title: "The email address is not valid!"
          });
        }
      });
  }

  signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        onNavigate('/');
        this.user = userCredential.user;
      })
      .catch((error) => {
        let errorCode = error.code;
        if (errorCode == "auth/weak-password") {
          Toast.fire({
            icon: 'info',
            title: "The password is too weak!"
          });
        } else if (errorCode == "auth/email-already-in-use"){
          Toast.fire({
            icon: 'info',
            title: "Oops... This email is already in use."
          });
        } else if (errorCode == "auth/invalid-email") {
          Toast.fire({
            icon: 'info',
            title: "The email address is not valid."
          });
        }
      });
  }

  signOut() {
    signOut(auth).then(() => {
      onNavigate('/');
      authService.user = null;
    }).catch((error) => {
      console.log(error.message)
    });
  }
}

const checkAuth = new Promise(resolve => {
  onAuthStateChanged(auth, (user) => {
    authService.user = user;
    if (user) {
      showMenuForUnauthorizedUser();
    } else {
      showMenuForAuthorizedUser();
    }
    resolve(user)
  });
})

function showMenuForAuthorizedUser() {
  document.getElementById('signup-link').classList.remove("hidden");
  document.getElementById('login-link').classList.remove("hidden");
  document.getElementById('logout-link').classList.add("hidden");
  document.getElementById('bar-link').classList.add("hidden");
  document.getElementById('create-link').classList.add("hidden");
}

function showMenuForUnauthorizedUser() {
  document.getElementById('signup-link').classList.add("hidden");
  document.getElementById('login-link').classList.add("hidden");
  document.getElementById('bar-link').classList.remove("hidden");
  document.getElementById('logout-link').classList.remove("hidden");
  document.getElementById('create-link').classList.remove("hidden");
}

export const authService = new AuthService();
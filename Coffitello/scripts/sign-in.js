import { authService } from "../services/auth.js";
import { onNavigate } from "../services/router.js";

function submitSignInForm(event) {
  let form = document.querySelector("form");
  if(form.checkValidity()) {
    event.preventDefault();
    let email = document.getElementById("user-name-field").value;
    let password = document.getElementById("password-field").value;
    authService.signIn(email, password);
  }
}

export function setSignInListeners() {
  document.getElementById("login-btn").addEventListener("click", submitSignInForm);
  document.getElementById("switch-link").addEventListener("click", (event) => {
    event.preventDefault();
    onNavigate("/register");
  })
}
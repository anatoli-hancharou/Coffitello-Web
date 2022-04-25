import { authService } from "../services/auth.js"

function submitSignUpForm(event) {
  let form = document.querySelector("form");
  if(form.checkValidity()) {
    event.preventDefault();
    let email = document.getElementById('user-name-field').value;
    let password = document.getElementById('password-field').value;
    authService.signUp(email, password);
  }
}

export function setSignUpListeners() {
  document.getElementById('register-btn').addEventListener('click', submitSignUpForm);
}
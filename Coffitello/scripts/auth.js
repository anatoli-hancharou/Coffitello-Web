import { authService } from "../services/auth.js"

function submitSignInForm(event) {
  let email = document.getElementById('user-name-field').value;
  let password = document.getElementById('password-field').value;
  authService.signIn(email, password);
  event.preventDefault();
}

function submitSignUpForm(event) {
  let email = document.getElementById('user-name-field').value;
  let password = document.getElementById('password-field').value;
  authService.signUp(email, password);
  event.preventDefault();
}

function setListeners() {
  document.getElementById('register-btn').addEventListener('click', submitSignUpForm);
  document.getElementById('login-btn').addEventListener('click', submitSignInForm);
}

document.addEventListener('contentChanged', setListeners);
setListeners();
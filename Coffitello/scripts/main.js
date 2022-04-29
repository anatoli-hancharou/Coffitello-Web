import { onNavigate } from "../services/router.js";
import { authService } from "../services/auth.js";
import { getCookie, setCookie } from "../services/cookie.js";

function setEventListeners() {
  const catalogLink = document.querySelector("#catalog-link a");
  const createLink = document.querySelector("#create-link a");
  const signupLink = document.querySelector("#signup-link a");
  const loginLink = document.querySelector("#login-link a");
  const logoutLink = document.querySelector("#logout-link a");
  const barLink = document.querySelector("#bar-link a");
  const changeMode = document.querySelector("#switch-theme")

  createLink.addEventListener("click", (e) => {
    onNavigate("/create");
    e.preventDefault();
  });

  signupLink.addEventListener("click", (e) => {
    onNavigate("/register");
    e.preventDefault();
  });

  loginLink.addEventListener("click", (e) => {
    onNavigate("/login");
    e.preventDefault();
  });

  logoutLink.addEventListener("click", (e) => {
    authService.signOut();
    e.preventDefault();
  });

  barLink.addEventListener("click", (e) => {
    onNavigate("/favorite");
    e.preventDefault();
  });

  catalogLink.addEventListener("click", (e) => {
    onNavigate("/");
    e.preventDefault();
  });

  changeMode.addEventListener("click", e => {
    if (changeMode.classList.contains("light")) {
      setCookie("mode", "dark", 7);
      changeMode.classList.remove("light");
      changeMode.firstChild.classList.add("fa-sun");
      changeMode.firstChild.classList.remove("fa-moon");
      document.documentElement.style.setProperty("--primary-background-color", "#55504c");
      document.documentElement.style.setProperty("--primary-text-color", "#b9a06d");
    } else {
      setCookie("mode", "light", 7);
      changeMode.classList.add("light");
      changeMode.firstChild.classList.remove("fa-sun");
      changeMode.firstChild.classList.add("fa-moon");
      document.documentElement.style.setProperty("--primary-background-color", "#F9F4EF");
      document.documentElement.style.setProperty("--primary-text-color", "#716040");
    }
  });

  if (getCookie("mode") == "dark") {
    changeMode.click();
  }
}

export function getURLParam(param) {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let value = urlParams.get(param);
  return value;
}

export function getCoctailRating(coctail) {
  if ("marks" in coctail) {
    let marks = Object.values(coctail.marks);
    return marks.length == 0 ? 0 : marks.reduce((a, b) => a + b) / marks.length;
  }
  return 0;
}

setEventListeners();
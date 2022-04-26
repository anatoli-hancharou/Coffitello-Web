import { onNavigate } from "../services/router.js";
import { authService } from "../services/auth.js";

function setEventListeners() {
    const catalogLink = document.querySelector('#catalog-link a');
    const createLink = document.querySelector('#create-link a');
    const signupLink = document.querySelector('#signup-link a');
    const loginLink = document.querySelector('#login-link a');
    const logoutLink = document.querySelector('#logout-link a');
    const barLink = document.querySelector('#bar-link a');

    createLink.addEventListener("click", (e) => {
        onNavigate('/create');
        e.preventDefault();
    });

    signupLink.addEventListener("click", (e) => {
        onNavigate('/register');
        e.preventDefault();
    });

    loginLink.addEventListener("click", (e) => {
        onNavigate('/login');
        e.preventDefault();
    });

    logoutLink.addEventListener("click", (e) => {
        authService.signOut();
        e.preventDefault();
    });

    barLink.addEventListener("click", (e) => {
        onNavigate('/favorite');
        e.preventDefault();
    });

    catalogLink.addEventListener("click", (e) => {
        onNavigate('/');
        e.preventDefault();
    });
}

export function getURLParam(param) {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let value = urlParams.get(param);
    return value;
}

setEventListeners();
import { authService } from "./auth.js";
import { styles } from "../constants/styles-sources.js";
import { routes, requireAuthRoutes } from "../constants/routes.js";
import { scripts } from "../constants/scripts-sources.js";

const rootDiv = document.getElementById('root');

export async function changeContent(pathname) {
  pathname = getPathWithoutParams(pathname);
  if (requireAuthRoutes.includes(pathname)) {
    let isAuth = await authService.isAuthorized();
    if (!isAuth) {
      onNavigate('/404');
      return;
    }
  }
  if (pathname in routes) {
    removeEventListeners();
    let content = routes[pathname];
    if (pathname in styles) {
      let style = getStyle(pathname);
      rootDiv.innerHTML = style.outerHTML;
      rootDiv.innerHTML += content;
    }
    
    if (pathname in scripts) {
      addScript(pathname);
      setEventListeners(pathname);
    }
  }
  else {
    onNavigate('/404');
  }
}

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  );
  changeContent(pathname);
}

function getPathWithoutParams(path) {
  let startParamsIndex = path.indexOf('?');
  if (startParamsIndex != -1) {
    return path.slice(0, startParamsIndex);
  }
  return path;
}

async function addScript(pathname) {
  let scriptSrc = scripts[pathname].script;    
  await loadScript(scriptSrc)
    .catch(error => console.log(`Error: ${error.message}`));
  rootDiv.dispatchEvent(new Event("contentChanged", {bubbles: true}));
}

function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    
    script.setAttribute("type", "module");
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Error while loading script: ${src}`));
    rootDiv.append(script);
    resolve();
  });
}

function getStyle(pathname) {
  let styleSrc = styles[pathname];
  let style = document.createElement("link");
  style.setAttribute("rel", "stylesheet");
  style.setAttribute("href", styleSrc);
 return style;
}

function setEventListeners(pathname) {
  rootDiv.addEventListener("contentChanged", scripts[pathname].eventListener);
}

function removeEventListeners() {
  for (let script in scripts) {
    rootDiv.removeEventListener("contentChanged", scripts[script].eventListener);
  }
}

window.onpopstate = () => changeContent(window.location.pathname);

window.addEventListener("load", () => {
  changeContent(window.location.pathname);
})
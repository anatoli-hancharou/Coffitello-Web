import { authService } from "./auth.js";
import { styles } from "../constants/styles-sources.js";
import { routes, requireAuthRoutes } from "../constants/routes.js";
import { scripts } from "../constants/scripts-sources.js";

const rootDiv = document.getElementById('root');

export async function changeContent(pathname) {
  pathname = getPathWithoutParams(pathname);
  if (pathname in requireAuthRoutes) {
    let isAuth = await authService.isAuthorized();
    if (!isAuth) {
      onNavigate('/404');
      return;
    }
  }
  if (pathname in routes) {
    rootDiv.innerHTML = routes[pathname];
    if (pathname in scripts) {
      addScript(pathname);
    }
    if (pathname in styles) {
      addStyle(pathname);
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
  var scriptSrc = scripts[pathname];    
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

function addStyle(pathname) {
  var styleSrc = styles[pathname];
  var style = document.createElement("link");
  style.setAttribute("rel", "stylesheet");
  style.setAttribute("href", styleSrc);
  rootDiv.prepend(style);
}

window.onpopstate = () => changeContent(window.location.pathname);

window.onload = () => changeContent(window.location.pathname);
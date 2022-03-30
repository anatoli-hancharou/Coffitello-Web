import { create } from "../views/create.js"
import { catalog } from "../views/catalog.js";
import { login } from "../views/login.js"
import { register } from "../views/register.js";
import { favorite } from "../views/favorite.js";
import { description } from "../views/description.js";
import { error } from "../views/error.js";

const routes = {
  '/' : catalog,
  '/create' : create,
  '/description' : description,
  '/login' : login,
  '/register' : register,
  '/favorite' : favorite,
  '/404' : error
};

const rootDiv = document.getElementById('root');

export function addContent(pathname) {
  pathname = getPathWithoutParams(pathname);
  if (pathname in routes) {
    rootDiv.innerHTML = routes[pathname];
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
  addContent(pathname);
}

function getPathWithoutParams(pathname) {
  let startParamsIndex = pathname.indexOf('?');
  if (startParamsIndex != -1) {
    return pathname.slice(0, startParamsIndex);
  }
  return pathname;
}
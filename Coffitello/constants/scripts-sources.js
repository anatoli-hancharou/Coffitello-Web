import { setSignInListeners } from "../scripts/sign-in.js";
import { setSignUpListeners } from "../scripts/sign-up.js";
import { setCreateCoctailListeners } from "../scripts/create-coctail.js";
import { setCatalogListeners } from "../scripts/catalog.js";

export const scripts = {
  "/" : { script: "scripts/catalog.js", eventListener: setCatalogListeners },
  "/create" : { script: "scripts/create-coctail.js", eventListener: setCreateCoctailListeners },
  "/login" : { script: "scripts/sign-in.js", eventListener: setSignInListeners },
  "/register" : { script: "scripts/sign-up.js", eventListener: setSignUpListeners }
}
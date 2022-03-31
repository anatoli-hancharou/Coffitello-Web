import { createSection } from "../views/create.js";
import { catalogSection } from "../views/catalog.js";
import { loginSection } from "../views/login.js";
import { registerSection } from "../views/register.js";
import { favoriteSection } from "../views/favorite.js";
import { descriptionSection } from "../views/description.js";
import { errorSection } from "../views/error.js";

export const routes = {
  '/' : catalogSection,
  '/create' : createSection,
  '/description' : descriptionSection,
  '/login' : loginSection,
  '/register' : registerSection,
  '/favorite' : favoriteSection,
  '/404' : errorSection
};

export const requireAuthRoutes = ["/create", "/favorite"];
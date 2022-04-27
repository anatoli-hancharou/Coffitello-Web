import { coctailDb } from "../services/database.js";
import { createCoctailImageDiv } from "../services/image-creator.js";
import { onNavigate } from "../services/router.js";
import { getCoctailRating } from "./main.js";

async function populateCatalog() {
  let coctails = await coctailDb.getCoctails();
  let catalogDiv = document.getElementById("catalog-grid");
  for (let coctail of coctails) {
    let coctailNode = document.createElement("a");
    coctailNode.setAttribute("href", "#");
    let coctailItemDiv = document.createElement("div");
    coctailItemDiv.classList.add("catalog-item");

    let coctailName = document.createElement("p");
    coctailName.classList.add("coctail-title", "italic-font");

    coctailName.textContent = coctail.name;
    coctailItemDiv.appendChild(coctailName);

    let coctailImageDiv = createCoctailImageDiv(coctail.ingredients);
    coctailItemDiv.appendChild(coctailImageDiv); 

    let ratingDiv = createRatingDiv(coctail);
    coctailItemDiv.appendChild(ratingDiv);
    coctailNode.appendChild(coctailItemDiv);

    coctailNode.addEventListener("click", event => {
      event.preventDefault();
      onNavigate(`/description?id=${coctail.id}`);
    });

    catalogDiv.append(coctailNode);
  }
}

function createRatingDiv(coctail) {
  let ratingDiv = document.createElement("div");
  ratingDiv.classList.add("grid-item-rating");

  let rating = Math.round(getCoctailRating(coctail));
  for (let i = 0; i < 5; i++) {
    let starSpan = document.createElement("span");
    starSpan.classList.add(i < rating ? "fa" : "far", "fa-star");
    starSpan.setAttribute('aria-hidden', "true");
    ratingDiv.appendChild(starSpan);
  }
  return ratingDiv;
}

export function setCatalogListeners() {
  populateCatalog();
}
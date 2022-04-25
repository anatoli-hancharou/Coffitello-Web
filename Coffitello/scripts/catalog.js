import { coctailDb } from "../services/database.js";
import { createCoctailImageDiv } from "../services/image-creator.js";

async function populateCatalog() {
  let coctails = await coctailDb.getCoctails();
  console.log(coctails);
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

    let coctailImageDiv = createCoctailImageDiv(coctail);
    coctailItemDiv.appendChild(coctailImageDiv); 

    let ratingDiv = createRatingDiv(coctail);
    coctailItemDiv.appendChild(ratingDiv);
    coctailNode.appendChild(coctailItemDiv);
    catalogDiv.append(coctailNode);
  }
}

function createRatingDiv(coctail) {
  let ratingDiv = document.createElement("div");
  ratingDiv.classList.add("grid-item-rating");

  for (let i = 0; i < 5; i++) {
    let starSpan = document.createElement("span");
    starSpan.classList.add("fa", "fa-star");
    starSpan.setAttribute('aria-hidden', "true");
    ratingDiv.appendChild(starSpan);
  }
  return ratingDiv;
}

export function setCatalogListeners() {
  populateCatalog();
}
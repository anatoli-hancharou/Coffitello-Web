import { coctailDb } from "../services/database.js";
import { createCoctailImageDiv } from "../services/image-creator.js";
import { onNavigate } from "../services/router.js";
/* <a href="#">
    <div class="catalog-item">
      <p class="italic-font coctail-title">Coctail</p>
      <div class="coctail-image">
        <img src="icons/drink.png" alt="empty-cup">
      </div>
      <div class="grid-item-rating">
        <span class="fa fa-star checked" aria-hidden="true"></span>
        <span class="fa fa-star" aria-hidden="true"></span>
        <span class="fa fa-star" aria-hidden="true"></span>
        <span class="fa fa-star" aria-hidden="true"></span>
        <span class="fa fa-star" aria-hidden="true"></span>
      </div>
    </div>
  </a> */


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
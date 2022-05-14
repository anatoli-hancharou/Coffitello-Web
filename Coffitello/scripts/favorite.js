import { coctailDb } from "../services/database.js";
import { createIngredinets } from "../services/image-creator.js";
import { authService } from "../services/auth.js";
import { onNavigate } from "../services/router.js";

async function setFavoriteInfo() {
  let favorites = await coctailDb.getFavorites(authService.user.uid);
  let coctails = await Promise.all(favorites.map(async (f) => await coctailDb.getCoctail(f.coctailId)));

  const favoriteList = document.getElementById("favorites-list");

  if (coctails.length === 0) {
    setEmptyBarMessage();
  }

  coctails.forEach(coctail => {
    let favoriteListItem = document.createElement("li");
    favoriteListItem.classList.add("favorites-list-item");
    let favoriteNode = document.createElement("a");
    favoriteNode.setAttribute("href", "#");
    let favoriteTemplate = getFavoriteCoctailTemplate(coctail.name, coctail.description);
    favoriteNode.innerHTML = favoriteTemplate;
    favoriteNode.addEventListener("click", (event) => {
      if (event.target.id !== "mark-favourite-btn") {
        event.preventDefault();
        onNavigate(`/description?id=${coctail.id}`);
      } else {
        favoriteListItem.classList.add("dissapear");
        setTimeout(() => {
          favoriteListItem.remove();
          if (favoriteList.innerHTML.trim() === "") {
            setEmptyBarMessage();
          }
        }, "1300")
      }
    });
    let imageBlock = favoriteNode.querySelector(".coctail-image-block");
    createIngredinets(coctail.ingredients).forEach(ing => {
      imageBlock.appendChild(ing);
    });

    let favoriteBtn = favoriteNode.querySelector("#mark-favourite-btn");
    favoriteBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      coctailDb.removeFavorite(coctail.id, authService.user.uid);
      favoriteBtn.style.backgroundImage = "url('../icons/empty-heart.png')";
    });

    favoriteListItem.appendChild(favoriteNode);
    favoriteList.appendChild(favoriteListItem);
  }); 
}

function setEmptyBarMessage() {
  let favSec = document.getElementById("favorites-section");
  let emptyMessage = document.createElement("h3");
  emptyMessage.setAttribute("id", "empty-message");
  emptyMessage.innerText = "Your bar is empty..."
  favSec.replaceWith(emptyMessage);
}

function getFavoriteCoctailTemplate(name, description) {
  return `<div class="favorite-wrapper">
    <button type="button" id="mark-favourite-btn"></button>
    <div class="coctail-image-block">
      <img src="icons/drink.png" alt="coctail cup">
    </div>
    <div class="favorite-info-block">
      <h3 class="favorite-coctail-name">${name}</h3>
      <p class="favorite-coctail-desc">${description}</p>
    </div>
  </div>`
}


export async function setFavoriteEventListeners() {
  if (await authService.isAuthorized()) {
    setFavoriteInfo();
  }
}
import { getURLParam, getCoctailRating } from "./main.js";
import { coctailDb } from "../services/database.js";
import { createIngredinets } from "../services/image-creator.js";
import { Comment } from "../models/comment.js";
import { authService } from "../services/auth.js";

async function setCoctailInfo(coctailId) {
  const coctail = await coctailDb.getCoctail(coctailId);
  document.getElementById("coctail-name").innerText = coctail.name; 
  document.getElementById("coctail-description").innerText = coctail.description; 
  document.getElementById("coctail-value").innerText = coctail.value;
  document.getElementById("coctail-author").innerText = coctail.addedBy;

  if (await authService.isAuthorized()) {
    if ("marks" in coctail && authService.user.uid in coctail.marks) {
      const stars = document.getElementsByClassName("fa-star");
      stars[5 - coctail.marks[authService.user.uid]].click();
    }
  }

  document.getElementById("coctail-rating").innerText =
      getCoctailRating(coctail).toFixed(2);
  
  const ingredientsList = document.getElementById("ingredients-list");
  for (const ingredient of coctail.ingredients) {
    let listItem = document.createElement("li");
    listItem.classList.add("ingredients-list-item");
    let ingredientSpan = document.createElement("span");
    ingredientSpan.innerText = `${ingredient.value}% ${ingredient.name}`;
    listItem.appendChild(ingredientSpan);
    ingredientsList.appendChild(listItem);
  }

  const imageBlock = document.querySelector(".coctail-image-block");
  createIngredinets(coctail.ingredients).forEach(ing => {
    imageBlock.appendChild(ing);
  });

  const infoBtn = document.getElementById("coctail-info-btn");
  infoBtn.addEventListener("click", () => {
    let infoBar = document.getElementById("coctail-info-sidebar");
    if (infoBar.classList.contains("coctail-info-sidebar")) {
      infoBar.classList.remove("coctail-info-sidebar");
    } else {
      infoBar.classList.add("coctail-info-sidebar");
    }
  })
}

async function setCommentsInfo(coctailId) {
  const addCommentBtn = document.getElementById("add-comment-btn");
  addCommentBtn.addEventListener("click", async () => {
    if (!await authService.isAuthorized()) {
      alert("Please, log in to leave comments!");
      return;
    }
    const textArea = document.getElementById("comment-textarea");
    let comment = new Comment(authService.user.email, textArea.value);
    textArea.value = "";
    coctailDb.addComment(coctailId, comment);
  });

  coctailDb.getComments(coctailId, addCommentElement);
}

function addCommentElement(email, date, text) {
  let commentsList = document.getElementById("comments-list");
  commentsList.innerHTML += getCommentTemplate(email, date, text);
}

function getCommentTemplate(email, date, text) {
return `<li class="comments-list-item">
  <div class="comment-wrapper">
    <div class="comment-info">
      <p>${email}</p>
      <time>${date}</time>
    </div>
    <p class="comment">${text}</p>
  </div>
</li>`;
}

function setRatingOnClick(coctailId) {
  const stars = [...document.getElementsByClassName("fa-star")];
  stars.map((star) => {
    star.addEventListener("click", async () => {
      if (!await authService.isAuthorized()) {
        alert("Please, log in to rate coctails!");
        return;
      }
      let i = stars.indexOf(star);
      let input = document.getElementsByClassName('rating-input');
      input[i].checked = true;
      coctailDb.addRating(coctailId, authService.user.uid, 5 - i);
      for (let j = 0; j < 5; j++) {
        stars[j].classList.remove("far", "fa");
        if (j >= i)
          stars[j].classList.add("fa");
        else {
          stars[j].classList.add("far");
        }
      }

      document.getElementById("coctail-rating").innerText =
        getCoctailRating(await coctailDb.getCoctail(coctailId)).toFixed(2);
    });
  });
}

async function setFavoriteInfo(coctailId) {
  if (!await authService.isAuthorized()) {
    return;
  }
  const infoBlock = document.getElementById("coctail-info-block");
  let favoriteBtn = document.createElement("button");
  infoBlock.appendChild(favoriteBtn);
  favoriteBtn.setAttribute("id", "mark-favourite-btn");
  let favorites = await coctailDb.getFavorites(authService.user.uid);
  favoriteBtn.style.backgroundImage = favorites.some(
    (fav) => fav.coctailId === coctailId)
    ? "url('../icons/heart.png')"
    : "url('../icons/empty-heart.png')";
  favoriteBtn.addEventListener("click", async () => {
    let favorites = await coctailDb.getFavorites(authService.user.uid);
    if (favorites.some(fav => fav.coctailId === coctailId)) {
      coctailDb.removeFavorite(coctailId, authService.user.uid);
      favoriteBtn.style.backgroundImage = "url('../icons/empty-heart.png')";
    }
    else {
      coctailDb.addFavorite(coctailId, authService.user.uid);
      favoriteBtn.style.backgroundImage = "url('../icons/heart.png')";
    }
  });
}

export function setDescriptionEventListeners() {
  const coctailId = getURLParam("id");
  setRatingOnClick(coctailId);
  setCoctailInfo(coctailId);
  setCommentsInfo(coctailId);
  setFavoriteInfo(coctailId);
}
import { getURLParam } from "./main.js";
import { coctailDb } from "../services/database.js";
import { createIngredinets } from "../services/image-creator.js";
import { Comment } from "../models/comment.js";
import { authService } from "../services/auth.js";

function setCoctailInfo(coctailId) {
  const coctail = coctailDb.getCoctail(coctailId);
  document.getElementById("coctail-name").innerText = coctail.name; 
  document.getElementById("coctail-description").innerText = coctail.description; 
  document.getElementById("coctail-value").innerText = coctail.value;
  document.getElementById("coctail-author").innerText = coctail.addedBy;
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

function setCommentsInfo(coctailId) {
  const addCommentBtn = document.getElementById("add-comment-btn");
  addCommentBtn.addEventListener("click", () => {
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

export function setDescriptionEventListeners() {
  const coctailId = getURLParam("id");
  setCoctailInfo(coctailId);
  setCommentsInfo(coctailId);
}
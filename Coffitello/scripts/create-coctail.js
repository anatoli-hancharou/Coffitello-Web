import { ingredients } from "../constants/ingredients.js";

const currentValues = [];

function setCategoryOnClickEvent() {
  let categoryItems = document.querySelectorAll(".choose-category-list-item");
  categoryItems.forEach(element =>
    element.addEventListener("click", (e) => { 
      categoryItems.forEach(el => el.classList.remove("selected"));
      e.currentTarget.classList.add("selected");
      addIngredients(e.currentTarget.children[0].innerText);
      setIngredientOnClickEvent();
    })
  );
}

function setIngredientOnClickEvent() {
  let ingredientsItems = document.querySelectorAll(".choose-ingredient-list-item");
  ingredientsItems.forEach(element =>
    element.addEventListener("click", (e) => { 
      let ingredientValue = e.currentTarget.innerText;

      if (currentValues.includes(ingredientValue)) {
        currentValues.splice(currentValues.indexOf(ingredientValue), 1);
        e.currentTarget.classList.remove("selected");
        var elem = document.getElementById("ingredients-values-list");
        elem.removeChild(Array.from(elem.childNodes).find(v => v.innerText == ingredientValue));
        return;
      }
     
      if (currentValues.length < 5) {
        e.currentTarget.classList.add("selected");
        currentValues.push(ingredientValue);
        addIngredientValue(ingredientValue);
      } else {
        alert("Can't add more than 5 ingredients.");
      }
    })
  );
}

function addIngredientValue(ingredient) {
  let ingredientsValuesList = document.querySelector("#ingredients-values-list");
  let li = document.createElement("li");
  li.classList.add("list-item", "value-list-item");
  li.innerText = ingredient;
  let input = document.createElement("input");
  input.classList.add("ingredient-value");
  input.setAttribute("type", "number");
  input.setAttribute("name", "ingredient-value");
  input.setAttribute("placeholder", "%");
  input.setAttribute("min", "0");
  input.setAttribute("max", "100");
  input.required = true;
  li.appendChild(input);
  ingredientsValuesList.appendChild(li);
}

function addCategories() {
  let categoryList = document.querySelector("#choose-category-list");
  for (const category of Object.keys(ingredients)) {
    let li = document.createElement("li");
    li.classList.add("list-item", "choose-category-list-item");
    let a = document.createElement("span");
    a.innerText = category;
    li.appendChild(a);
    categoryList.appendChild(li);
  }
}

function addIngredients(category) {
  let ingredientsList = document.querySelector("#choose-ingredient-list");
  ingredientsList.innerHTML = "";
  for (const ingredient of ingredients[category]) {
    let li = document.createElement("li");
    li.classList.add("list-item", "choose-ingredient-list-item");
    if (currentValues.includes(ingredient)) {
      li.classList.add("selected");
    }
    let a = document.createElement("span");
    a.innerText = ingredient;
    li.appendChild(a);
    ingredientsList.appendChild(li);
  }
}

function setListeners() {
  addCategories();
  setCategoryOnClickEvent();
}

document.addEventListener('contentChanged', setListeners);
setListeners();
import { ingredients } from "../constants/ingredients.js";
import { Ingredient } from "../models/ingredient.js";
import { Coctail } from "../models/coctail.js";
import { authService } from "../services/auth.js";
import { coctailDb } from "../services/database.js";

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
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  input.value = "";
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

function submitCreateCoctailForm(event) {
  let form = document.querySelector("form");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  else {
    event.preventDefault();
  }
  let name = document.getElementById('drink-name').value;
  let description = document.getElementById('drink-description-textarea').value;
  let value = document.getElementById('drink-value').valueAsNumber;
  let addedBy = authService.user.email;
  if (currentValues.length == 0) {
    alert("Please, select at least one ingredient for your coctail.");
    return;
  }

  let ingredientsNames = document.querySelectorAll(".value-list-item");
  let ingredientsValues = document.getElementsByClassName("ingredient-value");
  let ingredientsSum = Array.from(ingredientsValues).reduce((prev, b) => prev + b.valueAsNumber | 0, 0);

  if (!isInputValid(name, description, value, ingredientsSum)) {
    return false;
  }

  let ingredients = Array.from(ingredientsNames).map((n, i) =>
    new Ingredient(n.innerText, ingredientsValues[i].valueAsNumber));

  let coctail = new Coctail(name, addedBy, value, description, ingredients);
  console.log(coctail);

  coctailDb.addCoctail(coctail);
  
}

function isInputValid(name, description, value, ingredientsSum) {
  if (name.length < 2) {
    alert("Name should not be shorten than 2 symbols.");
    return false;
  }
  if (description.length < 5) {
    alert("Description should not be shorten than 5 symbols.");
    return false;
  }
  if (value < 50 || value > 2000) {
    alert("Value of your coctail should be between 50 and 2000 ml.");
    return false;
  }
  if (ingredientsSum != 100) {
    alert(`Sum of the values of each ingredient should be equal to 100%\nCurrent sum is ${ingredientsSum}%`);
    return false;
  }

  return true;
}

function setListeners() {
  addCategories();
  setCategoryOnClickEvent();
  document.getElementById('create-drink-btn').addEventListener('click', submitCreateCoctailForm);
}

document.addEventListener('contentChanged', setListeners);
setListeners();
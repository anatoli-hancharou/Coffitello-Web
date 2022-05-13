function getIngredientoPolygon(value) {
  return `clip-path: polygon(${10 * value / 100}% ${value}%, ${100 - (10 * value / 100)}% ${value}%, 85% 100%, 10% 100%);
  -webkit-clip-path: polygon(${10 * value / 100}% ${value}%, ${100 - (10 * value / 100)}% ${value}%, 85% 100%, 10% 100%);`;
}

export function createCoctailImageDiv(ingredients) {
  let coctailImageDiv = document.createElement("div");
  coctailImageDiv.classList.add("coctail-image");

  let coctailImg = document.createElement("img");
  coctailImg.setAttribute('src', "icons/drink.png");
  coctailImg.setAttribute('alt', "empty-cup");

  coctailImageDiv.appendChild(coctailImg);

  const ingredientsDivs = createIngredinets(ingredients);
  for (let ingredientDiv of ingredientsDivs) {
    coctailImageDiv.appendChild(ingredientDiv);
  }

  return coctailImageDiv;
}

export function createIngredinets(ingredients) {
  let sumOfValues = 0;
  for (let ingredient of ingredients) {
    sumOfValues += ingredient.value;
  }

  let ingredientsDivs = [];
  for (let ingredient of ingredients) {
    let ingredientDiv = document.createElement("div");
    ingredientDiv.classList.add("coctail-ingredient");
    ingredientDiv.classList.add(ingredient.name.trim().replace(/\s/g, '-').toLowerCase());
    ingredientDiv.setAttribute("style", getIngredientoPolygon(100 - sumOfValues | 0));
    sumOfValues -= ingredient.value;
    ingredientsDivs.push(ingredientDiv);
  }

  return ingredientsDivs;
}
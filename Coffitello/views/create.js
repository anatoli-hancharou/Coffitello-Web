export const createSection = `
<form class="create-drink-form" action="">
  <div class="drink-description-block">
    <div class="coctail-image-block">
        <img src="icons/drink.png" alt="coctail-cup">
    </div>
    <div class="description-block">
      <div class="form-gorup">
        <label for="drink-name" class="input-label">Name:</label>
        <input type="text" name="drink-name" id="drink-name" placeholder="Enter drink name..." required>
      </div>
      <div class="form-gorup">
        <label for="drink-value" class="input-label">Value:</label>
        <input type="text" name="drink-value" id="drink-value" placeholder="ml" required>
      </div>
      <div class="form-gorup">
        <label for="drink-description-textarea" class="input-label">Description:</label>
        <textarea name="drink-description-textarea" id="drink-description-textarea" placeholder="Description..."></textarea>
      </div>
    </div>
  </div>
  <div class="choose-ingredients-block">
    <div class="choose-block choose-category-block">
      <ul class="choose-category-list">
        <li class="list-item choose-category-list-item"><span>Wines & Champagnes</span></li>
        <li class="list-item choose-category-list-item"><span>Juices</span></li>
        <li class="list-item choose-category-list-item"><span>Sodas</span></li>
        <li class="list-item choose-category-list-item"><span>Liqueurs</span></li>
      </ul>
    </div>
    <div class="choose-block choose-ingredient-block">
      <ul class="choose-ingredient-list">
        <li class="list-item choose-ingredient-list-item"><span>Red wine</span></li>
        <li class="list-item choose-ingredient-list-item"><span>White wine</span></li>
        <li class="list-item choose-ingredient-list-item"><span>Rose wine</span></li>
        <li class="list-item choose-ingredient-list-item"><span>Champagne</span></li>
        <li class="list-item choose-ingredient-list-item"><span>Rose Champagne</span></li>
      </ul>
    </div>
    <div class="choose-block ingredients-values-block">
      <ul class="ingredients-values-list">
        <li class="list-item value-list-item">Red wine
            <input type="number" name="ingredient-value" class="ingredient-value" placeholder="%" min="0" max="100">
        </li>
        <li class="list-item value-list-item">Champagne
          <input type="number" name="ingredient-value" class="ingredient-value" placeholder="%" min="0" max="100">
      </li>
      </ul>
    </div>
  </div>
  <button type="button" id="create-drink-btn">CREATE</button>
</form>
`
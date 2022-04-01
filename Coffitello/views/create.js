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
        <input type="number" name="drink-value" id="drink-value" placeholder="ml" required>
      </div>
      <div class="form-gorup">
        <label for="drink-description-textarea" class="input-label">Description:</label>
        <textarea name="drink-description-textarea" id="drink-description-textarea" placeholder="Description..."></textarea>
      </div>
    </div>
  </div>
  <div class="choose-ingredients-block">
    <div class="choose-block choose-category-block">
      <ul id="choose-category-list">
      </ul>
    </div>
    <div class="choose-block choose-ingredient-block">
      <ul id="choose-ingredient-list">
      </ul>
    </div>
    <div class="choose-block ingredients-values-block">
      <ul id="ingredients-values-list">
      </ul>
    </div>
  </div>
  <button type="submit" id="create-drink-btn">CREATE</button>
</form>
`
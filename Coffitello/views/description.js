export const descriptionSection = `
<link rel="stylesheet" href="styles/ingredients.css">
<aside id="coctail-info-sidebar" class="coctail-info-sidebar" onclick="void(0);">
  <p>Value: <span id="coctail-value"></span> ml.</p>
  <ul id="ingredients-list">
  </ul>
  <div id="down-info">
    <p>Rating: <span id="coctail-rating"></span></p>
    <p>Author: <span id="coctail-author"></span></p>
  </div>
</aside>
<article id="coctail-info-block">
  <button type="button" id="coctail-info-btn"></button>
  <button type="button" id="mark-favourite-btn"></button>
  <div class="coctail-image-block">
    <img src="icons/drink.png" alt="coctail-cup">
  </div>
  <p id="coctail-name">Coctail</p>
  <div class="grid-item-rating">
    <input class="rating-input" id="star-rating-5" type="radio" name="rating" value="5">
    <label class="star-rating-icon far fa-star" for="star-rating-5" aria-hidden="true"></label>
    <input class="rating-input" id="star-rating-4" type="radio" name="rating" value="4">
    <label class="star-rating-icon far fa-star" for="star-rating-4" aria-hidden="true"></label>
    <input class="rating-input" id="star-rating-3" type="radio" name="rating" value="3">
    <label class="star-rating-icon far fa-star" for="star-rating-3" aria-hidden="true"></label>
    <input class="rating-input" id="star-rating-2" type="radio" name="rating" value="2">
    <label class="star-rating-icon far fa-star" for="star-rating-2" aria-hidden="true"></label>
    <input class="rating-input" id="star-rating-1" type="radio" name="rating" value="1">
    <label class="star-rating-icon far fa-star" for="star-rating-1" aria-hidden="true"></label>
  </div>
  <p id="coctail-description">Coctail description</p>
</article>
<section id="comment-section">
  <form id="comment-form">
    <textarea name="comment-textarea" id="comment-textarea" placeholder="Comment..."></textarea>
    <button type="button" id="add-comment-btn">Send</button>
  </form>
  <ul id="comments-list">
  </ul>
</section>
`
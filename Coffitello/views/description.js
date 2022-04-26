export const descriptionSection = `
<link rel="stylesheet" href="styles/ingredients.css">
<aside id="coctail-info-sidebar" class="coctail-info-sidebar" onclick="void(0);">
  <p>Value: <span id="coctail-value"></span> ml.</p>
  <ul id="ingredients-list">
  </ul>
  <div id="down-info">
    <p>Rating: <span id="coctail-rating">4.1</span></p>
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
    <span class="fa fa-star checked" aria-hidden="true"></span>
    <span class="fa fa-star" aria-hidden="true"></span>
    <span class="fa fa-star" aria-hidden="true"></span>
    <span class="fa fa-star" aria-hidden="true"></span>
    <span class="fa fa-star" aria-hidden="true"></span>
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
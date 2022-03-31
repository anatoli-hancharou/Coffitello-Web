export const descriptionSection = `
<aside id="coctail-info-sidebar">
  <p>Value: <span>250</span> ml.</p>
  <ul id="ingredients-list">
    <li class="ingredients-list-item"><span>50% Coca-cola</span></li>
    <li class="ingredients-list-item"><span>50% Whiskey</span></li>
  </ul>
  <div id="down-info">
    <p>Rating: <span>4.1</span></p>
    <p>Author: <span>user@gmail.com</span></p>
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
  <p id="coctail-description">This coctail is perfect for those who don’t like alcohol</p>
</article>
<section id="comment-section">
  <form id="comment-form">
    <textarea name="comment-textarea" id="comment-textarea" placeholder="Comment..."></textarea>
    <button type="button" id="add-comment-btn">Send</button>
  </form>
  <ul id="comments-list">
    <li class="comments-list-item">
      <div class="comment-wrapper">
        <div class="comment-info">
          <p>user@gmail.com</p>
          <time>11.11.2022</time>
        </div>
        <p class="comment">This is a comment</p>
      </div>
    </li>
  </ul>
</section>
`
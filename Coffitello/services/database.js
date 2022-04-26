import { db } from "../scripts/firebaseInit.js";
import { ref, set, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

class CoctailDb {
  constructor() {
    this.coctails = [];
  }

  addCoctail(coctail) {
    push(ref(db, 'coctails/'), {
      name: coctail.name,
      description: coctail.description,
      createDate: coctail.createDate.toISOString().slice(0, 10),
      addedBy: coctail.addedBy,
      value: coctail.value,
      ingredients: coctail.ingredients,
    })
  }

  async getCoctails() {
    await initializeCoctails.then(result => result)
    return this.coctails;
  }

  getCoctail(id) {
    return this.coctails.filter(coctail => coctail.id === id)[0];
  }

  addComment(coctailId, comment) {
    push(ref(db, 'post-comments/' + coctailId), {
      author: comment.author,
      text: comment.text,
      date: comment.date.toISOString().slice(0, 10)
    });
  }

  getComments(coctailId, addCommentElement) {
    const commentsRef = ref(db, 'post-comments/' + coctailId);
    onChildAdded(commentsRef, (data) => {
      addCommentElement(data.val().author, data.val().date, data.val().text);
    });
  }
}

const initializeCoctails = new Promise(resolve => {
  onChildAdded(ref(db, 'coctails/'), (data) => {
    coctailDb.coctails.push({ ...data.val(), id: data.key });
    resolve();
  })
});

export const coctailDb = new CoctailDb();
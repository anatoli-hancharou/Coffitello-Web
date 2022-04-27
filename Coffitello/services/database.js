import { db } from "../scripts/firebaseInit.js";
import { ref, set, push, remove, onChildAdded, onChildChanged,onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { authService } from "./auth.js";

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
    await initializeCoctails.then(result => result);
    return this.coctails;
  }

  async getCoctail(id) {
    await initializeCoctails.then(result => result);
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

  addRating(coctailId, userId, rating) {
    set(ref(db, `coctails/${coctailId}/marks/${userId}`), rating);
  }

  async getFavorites(userId) {
    return await initializeFavorites(userId).then(result => result);
  }

  addFavorite(coctailId, userId) {
    push(ref(db, 'favorites/' + userId), {
      coctailId: coctailId
    });
  }

  async removeFavorite(coctailId, userId) {
    let favorites = await initializeFavorites(userId).then(result => result);
    let favoriteCoctail = favorites.filter(f => f.coctailId === coctailId)[0];
    remove(ref(db, 'favorites/' + userId + '/' + favoriteCoctail.id));
  }
}

const initializeCoctails = new Promise(resolve => {
  onChildAdded(ref(db, 'coctails/'), (data) => {
    coctailDb.coctails.push({ ...data.val(), id: data.key });
    resolve();
  })
});

const initializeFavorites = (userId) => new Promise(resolve => {
  onValue(ref(db, 'favorites/' + userId), (snapshot) => {
    let favorites = [];
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      favorites.push({...childData, id: childKey})
    });
    resolve(favorites);
  });
});

onChildChanged(ref(db, 'coctails/'), (data) => {
  coctailDb.coctails.filter((coctail) => coctail.id === data.key)[0].marks =
    data.val().marks;
});

export const coctailDb = new CoctailDb();
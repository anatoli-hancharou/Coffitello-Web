import { db } from "../scripts/firebaseInit.js";
import { ref, set, push, onChildAdded, onValue} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

class CoctailDb {
  constructor() {
    this.coctails = [];
  }

  addCoctail(coctail) {
    push(ref(db, 'coctails/'),  {
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
}

const initializeCoctails = new Promise(resolve => {
  onChildAdded(ref(db, 'coctails/'), (data) => {
    coctailDb.coctails.push(data.val());
    resolve();
  })
});

export const coctailDb = new CoctailDb();
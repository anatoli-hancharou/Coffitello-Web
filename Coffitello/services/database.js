import { db } from "../scripts/firebaseInit.js";
import { ref, set, push } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

class CoctailDb {

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
}

export const coctailDb = new CoctailDb();
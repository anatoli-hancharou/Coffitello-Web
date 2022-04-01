export class Coctail {
  constructor(name, addedBy, value, description, ingredients) {
    this.name = name;
    this.description = description;
    this.value = value;
    this.addedBy = addedBy;  
    this.ingredients = ingredients;
    this.createDate = new Date();
    this.marks = [];
  }

  getRating() {
    return this.marks.reduce((a, b) => a + b, 0) / this.marks.length;
  }
}
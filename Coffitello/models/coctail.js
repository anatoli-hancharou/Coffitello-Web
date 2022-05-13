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
}
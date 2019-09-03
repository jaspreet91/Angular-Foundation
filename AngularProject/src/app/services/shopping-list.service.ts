import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  updateList = new EventEmitter<boolean>();
  private ingredients: Ingredient[] = [
    { name: 'apple', amount: 5 },
    { name: 'oranges', amount: 15 }
  ];
  constructor() { }

  getShoppingList() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.updateList.emit(true);
  }
}

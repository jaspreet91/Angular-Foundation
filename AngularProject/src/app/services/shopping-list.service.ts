import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  updateList = new Subject<boolean>();
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
    this.updateList.next(true);
  }
}

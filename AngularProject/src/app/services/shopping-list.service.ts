import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  updateList = new Subject<boolean>();
  startedEditing = new Subject();

  private ingredients: Ingredient[] = [
    { name: 'apple', amount: 5 },
    { name: 'oranges', amount: 15 }
  ];
  constructor() { }

  getShoppingList() {
    return this.ingredients.slice();
  }

  getIngredients(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.updateList.next(true);
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.updateList.next(true);
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.updateList.next(true);
  }

}

import { Injectable, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeListUpdated = new Subject<boolean>();

  private Recipe: Recipe[] = [
    {
      name: 'Daal Fry', description: 'daal fry', imagePath: 'https://picsum.photos/200/',
      ingredient: [{ name: 'Meat', amount: 1 }, { name: 'French Fries', amount: 1 }]
    },
    {
      name: 'Pav Bhaji', description: 'all vegies', imagePath: 'https://picsum.photos/200',
      ingredient: [{ name: 'xyz', amount: 12 }]
    },
  ];

  constructor() { }

  getRecipes() {
    return this.Recipe.slice();
  }

  getRecipe(id: number) {
    return this.Recipe.slice()[id];
  }

  deleteRecipe(id: number) {
   confirm('do you really want to delete');
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.Recipe[index] =  recipe;
  }
}

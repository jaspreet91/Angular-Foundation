import { Injectable, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private Recipe: Recipe[] = [
    { name: 'Daal Fry', description: 'daal fry', imagePath: 'https://picsum.photos/200/', name: 'zyx', amount: 1 },
    { name: 'Pav Bhaji', description: 'all vegies', imagePath: 'https://picsum.photos/200' },
  ];

  recipeSelected = new EventEmitter<Recipe>(true);

  constructor() { }

  getRecipes() {
    return this.Recipe.slice();
  }
}

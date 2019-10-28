import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';

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

  constructor(private http: HttpClient) { }

  getAllRecipes() {
    // return this.Recipe.slice();
  return  this.http.get('https://angular-http-6e830.firebaseio.com/recipes.json').pipe(
    map((res: Recipe) => {
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
        this.Recipe.push(res[key]);
        }
      }
      return this.Recipe;
      })
    );
  }

  getRecipe(id: number) {
    return this.Recipe.slice()[id];
  }

  addRecipe(recipe: Recipe) {
    this.http.post('https://angular-http-6e830.firebaseio.com/recipes.json', recipe).subscribe((res: any) => {
      if (res.name) {
        alert('data added succesfully');
     }
    });
    // this.Recipe.push(recipe);
    // this.recipeListUpdated.next(true);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.Recipe[index] = recipe;
    this.recipeListUpdated.next(true);
  }

  deleteRecipe(index: number) {
    const val = confirm('do you really want to delete');
    if (val) {
      this.Recipe.splice(index, 1);
      this.recipeListUpdated.next(true);
    }
  }
}

import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeListUpdated = new Subject<boolean>();

  private Recipe: Recipe[] = [];
  firebaseId: string;

  constructor(private http: HttpClient) { }

  getAllRecipes() {
    this.Recipe = [];
    // return this.Recipe.slice();
    return this.http.get('https://angular-http-6e830.firebaseio.com/recipes.json'
    // ,
    //   {
    //     headers: new HttpHeaders({ 'random-header': 'random' }),
    //     params: new HttpParams().set('firstparam', 'val')
    //   }
    ).pipe(
    map((res: Recipe) => {
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          res[key].id = key;
          this.Recipe.push(res[key]);
        }
      }
      return this.Recipe;
    }), catchError(errorRes => {
      return throwError(errorRes);
      })
    );
  }

  getRecipe(id: number) {
    return this.Recipe.slice()[id];
  }

  addRecipe(recipe: Recipe) {
    this.http.post('https://angular-http-6e830.firebaseio.com/recipes.json', recipe, { observe: 'response'}).subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.recipeListUpdated.next(true);
        alert('data added succesfully');
     }
    }, catchError(errorRes => {
        return throwError(errorRes);
    }));
    // this.Recipe.push(recipe);
    // this.recipeListUpdated.next(true);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.firebaseId = this.Recipe[index].id;
    this.http.patch('https://angular-http-6e830.firebaseio.com/recipes/' + this.firebaseId + '.json', recipe).subscribe(() => {
      this.recipeListUpdated.next(true);
    }, catchError(errorRes => {
      return throwError(errorRes);
    }));
    // this.Recipe[index] = recipe;
  }

  deleteRecipe(index: number) {
    const val = confirm('do you really want to delete');
    if (val) {
      this.firebaseId = this.Recipe[index].id;
      this.http.delete('https://angular-http-6e830.firebaseio.com/recipes/' + this.firebaseId + '.json').subscribe(() => {
        this.recipeListUpdated.next(true);
      }, catchError(errorRes => {
        return throwError(errorRes);
      })
      );
    }
  }
}

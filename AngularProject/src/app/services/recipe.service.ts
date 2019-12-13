import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { map, catchError, take, exhaustMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeListUpdated = new Subject<boolean>();

  private Recipe: Recipe[] = [];
  firebaseId: string;
  token: string;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllRecipes() {
    this.Recipe = [];
    // return this.Recipe.slice();
    return this.http.get('https://angular-http-6e830.firebaseio.com/recipes.json')
    .pipe(
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

  // getAllRecipes() {
  //   return this.authService.user.pipe(take(1), exhaustMap(user => {
  //     return this.http.get('https://angular-http-6e830.firebaseio.com/recipes.json',
  //       { params: new HttpParams().set('auth', user.token) });
  //   }), map((res: Recipe) => {
  //     for (const key in res) {
  //       if (res.hasOwnProperty(key)) {
  //         res[key].id = key;
  //         this.Recipe.push(res[key]);
  //       }
  //     }
  //     return this.Recipe;
  //   }), catchError(errorRes => {
  //     return throwError(errorRes);
  //   }));
  // }

  getRecipe(id: number) {
    return this.Recipe.slice()[id];
  }

  getRecipeById(firebaseId: string) {
    return this.http.get('https://angular-http-6e830.firebaseio.com/recipes/' + firebaseId + '.json');
  }

  addRecipe(recipe: Recipe) {
    this.http.post('https://angular-http-6e830.firebaseio.com/recipes.json', recipe, { observe: 'response'}).subscribe((res: any) => {
      if (res) {
        Swal.fire({
          icon: 'success',
          title: 'Your recipe has been saved',
          showConfirmButton: true,
        }).then(result => {
          if (result) {
            this.recipeListUpdated.next(true);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
          }
        });
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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.firebaseId = this.Recipe[index].id;
        this.http.delete('https://angular-http-6e830.firebaseio.com/recipes/' + this.firebaseId + '.json').subscribe(() => {
          this.recipeListUpdated.next(true);
        }, catchError(errorRes => {
          return throwError(errorRes);
        })
        );
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your recipe has been deleted.',
          'success'
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your recipe is safe :)',
          'error'
        );
      }
    });


    // const val = confirm('do you really want to delete');
    // if (val) {
    //   this.firebaseId = this.Recipe[index].id;
    //   this.http.delete('https://angular-http-6e830.firebaseio.com/recipes/' + this.firebaseId + '.json').subscribe(() => {
    //     this.recipeListUpdated.next(true);
    //   }, catchError(errorRes => {
    //     return throwError(errorRes);
    //   })
    //   );
    // }
  }
}

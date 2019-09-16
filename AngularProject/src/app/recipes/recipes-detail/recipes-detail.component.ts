import { RecipeService } from './../../services/recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;

      this.recipe = this.recipeService.getRecipe(this.id);

      if (!this.recipe) {

        this.router.navigate(['../no-recipe-found'], {relativeTo: this.route});
        }
    });

  }

  addToShoppingList() {
    this.recipe.ingredient.forEach(element => {
      this.shoppingListService.addIngredient(element);
    });
    alert('Items added to Shopping list');
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/']);
  }

}

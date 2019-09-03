import { RecipeService } from './../../services/recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipe: Recipe;
  constructor(private recipeService: RecipeService,
              private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe((recipeData: Recipe) => {
      this.recipe = recipeData;
    });
  }

  addToShoppingList() {
    this.recipe.ingredient.forEach(element => {
      this.shoppingListService.addIngredient(element);
    });
    alert('Items added to Shopping list');
  }


}

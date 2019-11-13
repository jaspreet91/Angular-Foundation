import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit, OnDestroy, } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  Recipe: Recipe[];
  updateRecipeSub: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {

    this.getAllData();
    this.updateRecipeSub = this.recipeService.recipeListUpdated.subscribe((update: boolean) => {
      if (update) {
        this.getAllData();
      }
    });
  }

  getAllData() {
    this.recipeService.getAllRecipes().subscribe((recipe: Recipe[]) => {
      this.Recipe = recipe;
    });
  }

  ngOnDestroy() {
    this.updateRecipeSub.unsubscribe();
  }
}

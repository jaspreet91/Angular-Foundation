import { RecipeService } from './../services/recipe.service';
import { Recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe((recipeData: Recipe) => {
      this.selectedRecipe = recipeData;
    });
  }

}

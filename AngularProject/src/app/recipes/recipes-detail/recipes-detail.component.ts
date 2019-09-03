import { RecipeService } from './../../services/recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe((recipeData: Recipe) => {
      // this.recipe = recipeData;
      console.log('emit event');
    });
  }


}

import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit, } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  Recipe: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.Recipe = this.recipeService.getRecipes();
  }
}

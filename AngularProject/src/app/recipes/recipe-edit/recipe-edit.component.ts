import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, RequiredValidator } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean;
  recipe: Recipe;
  editForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private formBuilder: FormBuilder) {
                      this.editForm = this.formBuilder.group({
                        name: ['', Validators.required],
                        description: ['', Validators.required],
                        imagePath: [''],
                        ingredientName: ['', Validators.required],
                        ingredientAmount: ['', Validators.required]
                      });
               }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      if (this.id !== undefined) {
        this.editMode = true;
      }
    });

    this.recipe = this.recipeService.getRecipe(this.id);

    if (!this.recipe) {
    this.router.navigate(['../new'], {relativeTo: this.route});
    } else {
      this.editForm.setValue({
        name: this.recipe.name,
        description: this.recipe.description,
        imagePath: this.recipe.imagePath,
        ingredientName: this.recipe.ingredient[0].name,
        ingredientAmount: this.recipe.ingredient[0].amount
      });
    }
    console.log(this.recipe);
  }

  onSave() {
    console.log(this.editForm.value);
    // this.recipeService.updateRecipe(this.id, this.ed)
  }

}

import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

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
  formIngredient: FormArray;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private formBuilder: FormBuilder) {
                      this.editForm = this.formBuilder.group({
                        name: ['', Validators.required],
                        description: ['', Validators.required],
                        imagePath: ['', Validators.required],
                        ingredient: new FormArray([])
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
        ingredient: []
      });

      if (this.recipe.ingredient) {
        this.recipe.ingredient.forEach((value) => {
         this.formIngredient = (this.editForm.get('ingredient') as FormArray);
         this.formIngredient.push(
            new FormGroup({
              name: new FormControl(value.name, Validators.required),
              amount: new FormControl(value.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        });
      }
    }
  }

  onSave() {
    console.log('im here');
    if (!this.editMode) {
      this.recipeService.updateRecipe(this.id, this.editForm.value);
    } else {
      this.recipeService.addRecipe(this.editForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route});
  }

  onAddIngredients() {
    this.formIngredient = (this.editForm.get('ingredient') as FormArray);
    this.formIngredient.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

}


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AuthguardGuard } from '../services/authguard.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';



const routes: Routes = [
  {
    path: 'recipes', component: RecipesComponent, canActivate: [AuthguardGuard], children: [
      { path: '', component: RecipeStartComponent, data: { message: 'Please select a recipe' } },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id/edit', component: RecipeEditComponent },
      { path: 'no-recipe-found', component: RecipeStartComponent, data: { message: 'Incorrect recipe ID' } },
      { path: ':id', component: RecipesDetailComponent },
      { path: '**', component: RecipeStartComponent, data: { message: 'Invalid Route' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }

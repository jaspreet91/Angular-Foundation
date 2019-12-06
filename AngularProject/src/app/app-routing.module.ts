import { AuthguardGuard } from './services/authguard.guard';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';


const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, canActivate:[AuthguardGuard],  children: [
    {path: '', component: RecipeStartComponent,  data: { message: 'Please select a recipe'}},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id/edit', component: RecipeEditComponent},
    {path: 'no-recipe-found', component: RecipeStartComponent,  data: { message: 'Incorrect recipe ID'}},
    {path: ':id', component: RecipesDetailComponent},
    {path: '**', component: RecipeStartComponent, data: {message: 'Invalid Route'}}
  ]},
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: RecipeStartComponent, data: { message: 'Invalid Route' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { ShoppingListService } from './../services/shopping-list.service';
import { Ingredient } from './../shared/ingredients.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  igChangeSub: Subscription;
  constructor(private shoppingList: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingList.getShoppingList();
    this.igChangeSub = this.shoppingList.updateList.subscribe(() => {
      this.ingredients = this.shoppingList.getShoppingList();
    });
  }

  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }
}

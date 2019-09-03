import { ShoppingListService } from './../services/shopping-list.service';
import { Ingredient } from './../shared/ingredients.model';
import { Component, OnInit } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];
  constructor(private shoppingList: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingList.getShoppingList();
    this.shoppingList.updateList.subscribe(() => {
      this.ingredients = this.shoppingList.getShoppingList();
    })
  }

}

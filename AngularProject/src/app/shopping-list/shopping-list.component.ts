import { Ingredient } from './../shared/ingredients.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    { name: 'apple', amount: 5 },
    { name: 'oranges', amount: 15 }
  ];
  constructor() { }

  ngOnInit() {
  }

}

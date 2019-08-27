import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {

  Recipe: Recipe[] = [
    { name: 'Daal Fry', description: 'daal fry', imagePath: 'https://picsum.photos/200/' },
    { name: 'Pav Bhaji', description: 'all vegies', imagePath: 'https://picsum.photos/200' },
  ];

  constructor() { }

  ngOnInit() {
  }

}

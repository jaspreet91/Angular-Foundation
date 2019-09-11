import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  message: string;
  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.message = data['message'];
    });
  }

}

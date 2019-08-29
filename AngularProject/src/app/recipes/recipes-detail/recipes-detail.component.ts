import { Component, OnInit, Input, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  @Input() recipe;
  constructor(private Renderer: Renderer2) { }

  ngOnInit() {
  }

  // dropdown() {
  //   this.Renderer.addClass('button, 'btn-group open');
  // }

}

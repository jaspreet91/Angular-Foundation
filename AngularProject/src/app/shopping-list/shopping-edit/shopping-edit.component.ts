import { Ingredient } from './../../shared/ingredients.model';
import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('nameInput', { static: false }) nameInput: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInput: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    this.ingredientAdded.emit({ name: this.nameInput.nativeElement.value, amount: this.amountInput.nativeElement.value });
  }


}

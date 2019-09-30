import { Subscription } from 'rxjs';
import { ShoppingListService } from './../../services/shopping-list.service';
import { Ingredient } from './../../shared/ingredients.model';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInput: ElementRef; REPLACED WITH FORM
  // @ViewChild('amountInput', { static: false }) amountInput: ElementRef;

  @ViewChild('shoppingEditForm', { static: true }) shoppingEditForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredients(index);
      this.shoppingEditForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  onAddItem(formData: NgForm) {
    if (this.editMode) {
      this.EditItem();
    } else {
      this.shoppingListService.addIngredient({ name: formData.value.name, amount: formData.value.amount });
    }
    this.resetForm();
  }

  EditItem() {
    this.shoppingListService.updateIngredient(this.editItemIndex, this.shoppingEditForm.value);
    this.editModeVal();
  }

  onClear() {
    this.resetForm();
    this.editModeVal();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.resetForm();
    this.editModeVal();
  }

  editModeVal() {
    this.editMode = false;
  }

  resetForm() {
    this.shoppingEditForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

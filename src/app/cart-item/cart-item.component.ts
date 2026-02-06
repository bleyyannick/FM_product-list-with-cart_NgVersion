import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { selectableProduct } from '../models/product';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  removeIconImg = 'assets/images/icon-remove-item.svg';

  cartItem = input.required<selectableProduct>();
  onRemove = output<selectableProduct>();
  
  remove(item: selectableProduct) {
    item.quantity = 0;
    item.isSelected = false;
    this.onRemove.emit(item);
  }
}

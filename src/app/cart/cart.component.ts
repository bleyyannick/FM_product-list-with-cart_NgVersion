import { Component, input, output } from '@angular/core';
import { selectableProduct } from '../models/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  template: `
      <article class="cart">
        <h2>Your cart({{getTotalQuantity()}})</h2>
        
        @for( addedItem of itemsInCart(); track addedItem.item.name) {
          <h1>{{addedItem.item.name}}</h1>
          <p>{{addedItem.item.price}}</p>
          <p>{{addedItem.quantity}}</p>
          <img (click)="removeItem(addedItem)" [src]="removeIconImg" alt="remove item">

         

        } @empty {
          <img  [src]="emptyCartImg" alt="empty cart">
          <p>Your added items will appear here</p>
        }  
      </article>
  `,
  styleUrl: './cart.component.css'
})
export class CartComponent {
  itemsInCart = input<selectableProduct[]>();
  onRemoveItem= output<selectableProduct>();

  emptyCartImg = 'assets/images/illustration-empty-cart.svg';
  removeIconImg = 'assets/images/icon-remove-item.svg';


  constructor() {}

  getTotalAmount() {
    return this.itemsInCart()?.reduce((acc, {item: {price}, quantity}) => {
      return acc + price * quantity;
    }, 0);
  }
  getTotalQuantity() {
    return this.itemsInCart()?.reduce((acc, {quantity}) => {
      return acc + quantity;
  }, 0);
}

  removeItem(item: selectableProduct) {
     console.log(item);
     item.quantity = 0;
     item.isSelected = false;
    this.onRemoveItem.emit(item);
    console.log(this.itemsInCart());
  }
}

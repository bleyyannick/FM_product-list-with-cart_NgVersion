import { Component, input } from '@angular/core';
import { selectableProduct } from '../models/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  template: `
      <article class="cart">
        <h2>Your cart(0)</h2>
        
        @for( addedItem of itemsInCart(); track addedItem.item.name) {
          <h1>{{addedItem.item.name}}</h1>
          <p>{{addedItem.item.price}}</p>
          <p>{{addedItem.quantity}}</p>

         

        } @empty {
          <img [src]="emptyCartImg" alt="empty cart">
          <p>Your added items will appear here</p>
        }

        <em>Total Amount : {{ getTotalAmount() }}</em>
        
      </article>
  `,
  styleUrl: './cart.component.css'
})
export class CartComponent {
  itemsInCart = input<selectableProduct[]>();

  emptyCartImg = 'assets/images/illustration-empty-cart.svg';

  constructor() {}

  getTotalAmount() {
    return this.itemsInCart()?.reduce((acc, item) => {
      return acc + item.item.price * item.quantity;
    }, 0);
  }
}

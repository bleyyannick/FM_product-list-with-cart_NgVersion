import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  template: `
      <article class="cart">
        <h2>Your cart(0)</h2>
        <img [src]="emptyCartImg" alt="empty cart">
        <p>Your added items will appear here</p>
      </article>
  `,
  styleUrl: './cart.component.css'
})
export class CartComponent {
  emptyCartImg = 'assets/images/illustration-empty-cart.svg';
}

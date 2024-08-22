import { Component, input, output } from '@angular/core';
import { selectableProduct } from '../models/product';
import { CartItemComponent } from "../cart-item/cart-item.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent],
  template: `
      <article class="cart">
        <h2>Your cart({{getTotalQuantity()}})</h2>
        
        @for( addedItem of itemsInCart(); track addedItem.item.name) {
          <app-cart-item [cartItem]="addedItem" (onRemove)="removeItem($event)" />
        } @empty {
          <img class="empty-icon"  [src]="emptyCartImg" alt="empty cart">
          <p>Your added items will appear here</p>
        } 
        @if(itemsInCart().length > 0) { 
          <div class="cart-order">
            <div>
              <h3>Order Total</h3>
              <p>{{"$" + getTotalAmount()}}</p>
            </div>
            <div>
              <img class="order-icon" src="assets/images/icon-carbon-neutral.svg" alt="carbon neutral icon">
              <p>This is a <em>carbon neutral</em> delivery</p>
            </div>
            <button (click)="confirmOrder($event)" class="cart-confirm">Confirm order</button>
          </div>
        }
      </article>
  `,
  styleUrl: './cart.component.css'
})
export class CartComponent {
  itemsInCart = input.required<selectableProduct[]>();
  onRemoveItem= output<selectableProduct>();
  onConfirmOrder = output<boolean>();

  emptyCartImg = 'assets/images/illustration-empty-cart.svg';
  
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
    this.onRemoveItem.emit(item);
  }

  confirmOrder(event: Event) {
    event.preventDefault();
    this.onConfirmOrder.emit(true);
  }
}

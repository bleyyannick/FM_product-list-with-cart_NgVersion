import { Component, inject, output } from '@angular/core';
import { selectableProduct } from '../models/product';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { CartService } from '../services/Cart.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CartItemComponent],
    template: `
      <article class="cart">
        <h2>Your cart({{cartService.totalQuantity()}})</h2>
        
        @for( addedItem of cartService.items(); track addedItem.item.name) {
          <app-cart-item [cartItem]="addedItem" (onRemove)="removeItem($event)" />
        } @empty {
          <img class="empty-icon"  [src]="emptyCartImg" alt="empty cart">
          <p>Your added items will appear here</p>
        } 
        @if(!cartService.isEmpty()) { 
          <div class="cart-order">
            <div>
              <h3>Order Total</h3>
              <p>{{"$" + cartService.totalAmount()}}</p>
            </div>
            <div>
              <img class="order-icon" src="assets/images/icon-carbon-neutral.svg" alt="carbon neutral icon">
              <p>This is a <em>carbon neutral</em> delivery</p>
            </div>
            <button (click)="confirmOrder($event)" class="cart-confirm">{{ cartService.getButtonMessage() }}</button>
          </div>
        }
      </article>
  `,
    styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartService = inject(CartService);
  onRemoveItem = output<selectableProduct>();
  onConfirmOrder = output<boolean>();

  emptyCartImg = 'assets/images/illustration-empty-cart.svg';

  removeItem(item: selectableProduct) {
    this.onRemoveItem.emit(item);
  }

  confirmOrder(event: Event) {
    event.preventDefault();
    this.onConfirmOrder.emit(true);
  }
}

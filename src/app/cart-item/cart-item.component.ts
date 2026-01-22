import { Component, input, output } from '@angular/core';
import { selectableProduct } from '../models/product';

@Component({
    selector: 'app-cart-item',
    standalone: true,
    imports: [],
    template: `
     <div class="item">
        <div>
          <h4>{{cartItem().item.name}}</h4>
          <span class="item-quantity">{{cartItem().quantity + "x"}}</span>
          <span class="item-price"> {{ "@ $" + cartItem().item.price}}</span>
          <span class="item-total-price">{{ "$" +cartItem().item.price * cartItem().quantity}}</span>
        </div>
        <div>
           <img class="remove-icon" (click)="remove(cartItem())" [src]="removeIconImg" alt="Icon for removing an item">
        </div>
     </div>
  
  `,
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

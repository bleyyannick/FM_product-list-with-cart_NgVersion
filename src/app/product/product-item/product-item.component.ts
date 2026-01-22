import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { selectableProduct } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  standalone: true,
  template: `
    <article class="product-item">
      <div class="product-image">
          <img 
           [src]="item().item.image.desktop" 
            alt="{{item().item.name}}"
           [class]="{
            'isSelected': isSelectableProduct(),
           }">
          <button 
              [class]="{
                'btn': true,
                'selected-product': isSelectableProduct(),
              }">
            @if (isSelectableProduct()) {
               <img class="icon-decrement" (click)="updateCart('decrement')"  src="assets/images/icon-decrement-quantity.svg" alt="decrement product quantity" />
                 <p class="product-quantity">{{item().quantity}}</p>
               <img class="icon-increment" (click)="updateCart('increment')"  src="assets/images/icon-increment-quantity.svg" alt="increment product quantity" />
            } @else {
              <img (click)="updateCart('add')" class="icon-cart" src="assets/images/icon-add-to-cart.svg" alt="Add to cart" />
              Add to cart
            }
           
          </button>
      </div>
      <div class="product-description">
          <p> {{item().item.category}}</p>
          <p>{{item().item.name}}</p>
          <p>{{ toFormatPrice(item().item.price)}}</p>
      </div>     
  </article>
  `,
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  item = input.required<selectableProduct>();
  onAddCart = output<selectableProduct>();
  onIncrement = output<selectableProduct>();
  onDecrement = output<selectableProduct>();
  updateCart(action: 'add' | 'increment' | 'decrement') {
    const eventMap = {
      'add': this.onAddCart,
      'increment': this.onIncrement,
      'decrement': this.onDecrement
    };
    eventMap[action].emit(this.item());
  }

  isSelectableProduct() {
    return this.item().isSelected;
  }

  toFormatPrice(price: number) {
    return new CurrencyPipe('en-US').transform(price);
  }

}

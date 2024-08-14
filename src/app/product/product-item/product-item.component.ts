import { Component, input, output,  } from '@angular/core';
import { selectableProduct } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [],
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
             (click)="addCart()" 
              [class]="{
                'btn': true,
                'selected-product': isSelectableProduct(),
              }">
            @if (isSelectableProduct()) {
               <img class="icon-decrement" (click)="decrement($event)"  src="assets/images/icon-decrement-quantity.svg" alt="decrement product quantity" />
                 <p class="product-quantity">{{item().quantity}}</p>
               <img class="icon-increment" (click)="increment($event)"  src="assets/images/icon-increment-quantity.svg" alt="increment product quantity" />
            } @else {
              <img class="icon-cart" src="assets/images/icon-add-to-cart.svg" alt="Add to cart" />
              Add to cart
            }
           
          </button>
      </div>
      <div class="product-description">
          <p> {{item().item.category}}</p>
          <p>{{item().item.name}}</p>
          <p>{{item().item.price}}</p>
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

  addCart() {
    this.onAddCart.emit(this.item());
  }
  
  increment(event: Event) {
    event.stopPropagation();
    this.onIncrement.emit(this.item());
  }

  decrement(event: Event) {
    event.stopPropagation();
    this.onDecrement.emit(this.item());
  }

  isSelectableProduct() {
    return this.item().isSelected;
  }



}

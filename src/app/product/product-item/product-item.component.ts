import { Component, input, signal } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [],
  template: `
    <article class="product-item">
      <div class="product-image">
          <img 
           [src]="product().image.desktop" 
           alt="{{product().name}}"
           [class]="{
            'isSelected': isSelected()
           }">
          <button 
             (click)="onAddCart()" 
              [class]="{
                'btn': true,
                'selected-product': isSelected() && productQuantity() > 0 
              }">
            @if (isSelected() && productQuantity() > 0) {
               <img class="icon-decrement" (click)="onDecrement($event)"  src="assets/images/icon-decrement-quantity.svg" alt="decrement product quantity" />
                 <p class="product-quantity">{{productQuantity()}}</p>
               <img class="icon-increment" (click)="onIncrement($event)"  src="assets/images/icon-increment-quantity.svg" alt="increment product quantity" />
            } @else {
              <img class="icon-cart" src="assets/images/icon-add-to-cart.svg" alt="Add to cart" />
              Add to cart
            }
           
          </button>
      </div>
      <div class="product-description">
          <p> {{product().category}}</p>
          <p>{{product().name}}</p>
          <p>{{product().price}}</p>
      </div>     
  </article>
  `,
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  product = input.required<Product>({})
  productQuantity = signal<number>(1)
  isSelected = signal<boolean>(false)


  onAddCart() {
    this.isSelected.set(true);
    this.productQuantity.set(1);
  }

  onIncrement(event: Event) {
    event.stopPropagation();
    this.productQuantity.update((quantity) => quantity + 1);
  }

  onDecrement(event: Event) {
    event.stopPropagation();
    if (this.productQuantity() === 0) {
      this.isSelected.update((isSelected) => !isSelected);
    } else {
      this.productQuantity.update((quantity) => quantity - 1);
    }
  }
    
  

}

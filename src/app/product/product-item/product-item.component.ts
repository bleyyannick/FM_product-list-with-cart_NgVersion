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
                'selected-product': isSelected()
              }">
            @if (isSelected())  {
               <img (click)="onDecrement()"  src="assets/images/icon-decrement-quantity.svg" alt="decrement product quantity" />
                 <p class="product-quantity">{{productQuantity()}}</p>
               <img (click)="onIncrement()"  src="assets/images/icon-increment-quantity.svg" alt="increment product quantity" />
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
  }

  onIncrement() {
    this.productQuantity.set(this.productQuantity() + 1);
  }

  onDecrement() {
    if(this.productQuantity() >= 1)  {
      this.productQuantity.set(this.productQuantity() - 1);
    }
  }
    
  

}

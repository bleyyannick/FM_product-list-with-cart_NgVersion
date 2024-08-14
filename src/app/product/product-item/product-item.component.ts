import { Component, input } from '@angular/core';
import { selectableProduct } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [],
  template: `
    <article class="product-item">
      <div class="product-image">
          <img 
           [src]="selectableProduct().item.image.desktop" 
           alt="{{selectableProduct().item.name}}"
           [class]="{
            'isSelected': isSelectableProduct(),
           }">
          <button 
             (click)="onAddCart()" 
              [class]="{
                'btn': true,
                'selected-product': isSelectableProduct(),
              }">
            @if (isSelectableProduct()) {
               <img class="icon-decrement" (click)="onDecrement($event)"  src="assets/images/icon-decrement-quantity.svg" alt="decrement product quantity" />
                 <p class="product-quantity">{{selectableProduct().quantity}}</p>
               <img class="icon-increment" (click)="onIncrement($event)"  src="assets/images/icon-increment-quantity.svg" alt="increment product quantity" />
            } @else {
              <img class="icon-cart" src="assets/images/icon-add-to-cart.svg" alt="Add to cart" />
              Add to cart
            }
           
          </button>
      </div>
      <div class="product-description">
          <p> {{selectableProduct().item.category}}</p>
          <p>{{selectableProduct().item.name}}</p>
          <p>{{selectableProduct().item.price}}</p>
      </div>     
  </article>
  `,
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  selectableProduct = input.required<selectableProduct>({})

  onAddCart() {
    this.selectableProduct().isSelected = true;
    this.selectableProduct().quantity = 1;
  }

  onIncrement(event: Event) {
    event.stopPropagation();
    this.selectableProduct().quantity = this.selectableProduct().quantity + 1;
  }

  onDecrement(event: Event) {
    event.stopPropagation();
    if (this.selectableProduct().quantity < 1) {
      this.selectableProduct().isSelected = false;
    } else  {
      this.selectableProduct().quantity = this.selectableProduct().quantity - 1;
    }
  }

  isSelectableProduct() :boolean {
    return this.selectableProduct().isSelected && this.selectableProduct().quantity > 0 
  }

}

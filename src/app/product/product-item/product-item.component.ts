import { Component, input, signal } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [],
  template: `
    <article class="product-item">
      <div class="product-image">
          <img [src]="product().image.desktop" alt="{{product().name}}">
          <button class="btn product-add-to-cart">
            <img class="icon-cart" src="assets/images/icon-add-to-cart.svg" alt="Add to cart">
            Add to cart
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

  product = input.required<Product>({
  })

}

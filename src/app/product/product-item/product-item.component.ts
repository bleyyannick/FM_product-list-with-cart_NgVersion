import { Component, input, signal } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [],
  template: `
    <div class="product-item">
      <img [src]="product().image.thumbnail" alt="{{product().name}}">
      <h2>{{product().name}}</h2>
      <p>{{product().price }}</p>
      <p>{{product().category}}</p>
    </div>
  `,
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  product = input.required<Product>({
  })

}

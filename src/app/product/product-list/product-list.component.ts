import { Component, input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductItemComponent } from "../product-item/product-item.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent],
  template: `
  <h1> Product List</h1>
  @for (product of products(); track product.name) {
    <app-product-item [product]="product"></app-product-item>
  }`,
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
    products = input.required<Product[]>();

    constructor() {
        console.log(this.products);
    }
}

import { Component, input } from '@angular/core';
import { Product, selectableProduct } from 'src/app/models/product';
import { ProductItemComponent } from "../product-item/product-item.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent],
  template: `
  @for (product of products(); track product.item.name) {
    <app-product-item [selectableProduct]="product"></app-product-item>
  }`,
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
    products = input.required<selectableProduct[]>();

    constructor() {
    }
}

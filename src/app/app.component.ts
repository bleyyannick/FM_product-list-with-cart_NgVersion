import { Component, signal, ViewEncapsulation } from '@angular/core';
import  productList  from '../assets/data.json';
import { Product, selectableProduct } from './models/product';
import { ProductListComponent } from "./product/product-list/product-list.component";
import { CartComponent } from "./cart/cart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ProductListComponent, CartComponent],
  template: `
    <main>
       <h1> Desserts</h1>
       <app-product-list [products]="selectableProducts()"></app-product-list>
    </main>
    <aside>
      <app-cart></app-cart>
    </aside>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  productList = signal<Product[]>([]);
  selectableProducts = signal<selectableProduct[]>([]);

   constructor() {
    this.productList.set(productList);
    this.selectableProducts.set(productList.map(product => ({
      item: product,
      isSelected: false,
      quantity: 0,
    })));
  }
}
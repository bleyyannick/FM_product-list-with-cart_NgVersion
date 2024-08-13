import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import  productList  from '../assets/data.json';
import { Product } from './models/product';
import { ProductListComponent } from "./product/product-list/product-list.component";
import { CartComponent } from "./cart/cart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent, CartComponent],
  template: `
    <main>
       <h1> Desserts</h1>
       <app-product-list [products]="productList()"></app-product-list>
    </main>
    <aside>
      <app-cart></app-cart>
    </aside>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  productList = signal<Product[]>([]);

   constructor() {
    this.productList.set(productList);
  }
}
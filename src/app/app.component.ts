import { Component, signal } from '@angular/core';

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
       <app-product-list></app-product-list>
    </main>
    <aside>
      <app-cart></app-cart>
    </aside>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
}
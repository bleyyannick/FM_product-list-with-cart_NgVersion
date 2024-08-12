import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import  productList  from '../assets/data.json';
import { Product } from './models/product';
import { ProductListComponent } from "./product/product-list/product-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListComponent],
  template: `
    <main>
       <h1> Desserts</h1>
       <app-product-list [products]="productList()"></app-product-list>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  productList = signal<Product[]>(productList);
  thumbnail = this.productList()[0].image.thumbnail;

   constructor() {
    console.log(this.thumbnail);
  }
}
import { Component, output, signal } from '@angular/core';
import { Product, selectableProduct } from 'src/app/models/product';
import { ProductItemComponent } from "../product-item/product-item.component";
import productData from '../../../assets/data.json'

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent],
  template: `
  @for (product of products(); track product.item.name) {
    <app-product-item 
     [item]="product"
     (onAddCart)="addCart($event)"
     (onDecrement)="decrement($event)"
     (onIncrement)="increment($event)">
    </app-product-item>
  }`,
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  products = signal<selectableProduct[]>([]);
  productData = signal<Product[]>([]);

  addItemsToCart = output<selectableProduct>({});
  deleteItemFromCart = output<selectableProduct>({});

  constructor() {
    this.productData.set(productData);
    this.products.set(this.productData().map((product) => ({
      item: product,
      isSelected: false,
      quantity: 0,
    })))
  }

  addCart(selectedProduct: selectableProduct) {
    this.products.update(products => {
      const index = [...products].findIndex(({ item }) => item.name === selectedProduct.item.name);
      if (index > -1) {
        products[index].quantity++;
        products[index].isSelected = true;
        this.addItemsToCart.emit(selectedProduct);
      }
      return products;
    })

  }

  decrement(selectedProduct: selectableProduct) {
    this.products.update(products => {
      const index = [...products].findIndex(({ item }) => item.name === selectedProduct.item.name);
      if (index > -1) {
        products[index].quantity--;
      }
      if (products[index].quantity === 0) {
        products[index].isSelected = false;
        this.deleteItemFromCart.emit(selectedProduct);
      }
      return products;
    })
  }

  increment(selectedProduct: selectableProduct) {
    this.products.update(products => {
      const index = [...products].findIndex(({ item }) => item.name === selectedProduct.item.name);
      if (index > -1) {
        products[index].quantity++;
        products[index].isSelected = true;
      }
      return products;
    })
  }
}

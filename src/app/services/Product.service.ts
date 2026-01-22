
import { Injectable, signal } from '@angular/core';
import { Product, selectableProduct } from '../models/product';
import productData from '../../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  products = signal<selectableProduct[]>([]);
  private productData = signal<Product[]>([]);

  constructor() {
    this.initializeProducts();
  }

  private initializeProducts() {
    this.productData.set(productData);
    this.products.set(
      this.productData().map((product) => ({
        item: product,
        isSelected: false,
        quantity: 0,
      }))
    );
  }

  addProduct(selectedProduct: selectableProduct): selectableProduct | null {
    let addedProduct: selectableProduct | null = null;
    
    this.products.update(products => {
      const index = products.findIndex(({ item }) => item.name === selectedProduct.item.name);
      if (index > -1) {
        products[index].quantity++;
        products[index].isSelected = true;
        addedProduct = { ...products[index] };
      }
      return [...products];
    });
    
    return addedProduct;
  }

  incrementProduct(selectedProduct: selectableProduct): void {
    this.products.update(products => {
      const index = products.findIndex(({ item }) => item.name === selectedProduct.item.name);
      if (index > -1) {
        products[index].quantity++;
        products[index].isSelected = true;
      }
      return [...products];
    });
  }

  decrementProduct(selectedProduct: selectableProduct): boolean {
    let shouldRemoveFromCart = false;
    
    this.products.update(products => {
      const index = products.findIndex(({ item }) => item.name === selectedProduct.item.name);
      if (index > -1) {
        products[index].quantity--;
        if (products[index].quantity === 0) {
          products[index].isSelected = false;
          shouldRemoveFromCart = true;
        }
      }
      return [...products];
    });
    
    return shouldRemoveFromCart;
  }

  resetProduct(productName: string): void {
    this.products.update(products => 
      products.map(product =>
        product.item.name === productName
          ? { ...product, quantity: 0, isSelected: false }
          : product
      )
    );
  }

  resetAllProducts(): void {
    this.products.update(products =>
      products.map(product => ({ ...product, quantity: 0, isSelected: false }))
    );
  }

  getProducts() {
    return this.products;
  }

  getProductByName(name: string): selectableProduct | undefined {
    return this.products().find(product => product.item.name === name);
  }
}
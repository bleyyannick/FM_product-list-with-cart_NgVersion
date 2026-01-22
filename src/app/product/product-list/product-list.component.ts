import { Component, output, inject } from '@angular/core';
import { selectableProduct } from 'src/app/models/product';
import { ProductItemComponent } from "../product-item/product-item.component";
import { ProductService } from '../../services/Product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent],
  template: `
  @for (product of productService.products(); track product.item.name) {
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

  productService = inject(ProductService);
  
  addItemsToCart = output<selectableProduct>({});
  updateItemInCart = output<selectableProduct>({});
  deleteItemFromCart = output<selectableProduct>({});

  addCart(selectedProduct: selectableProduct) {
    const addedProduct = this.productService.addProduct(selectedProduct);
    if (addedProduct) {
      this.addItemsToCart.emit(addedProduct);
    }
  }

  decrement(selectedProduct: selectableProduct) {
    const shouldRemove = this.productService.decrementProduct(selectedProduct);
    const updatedProduct = this.productService.getProductByName(selectedProduct.item.name);
    
    if (shouldRemove) {
      this.deleteItemFromCart.emit(selectedProduct);
    } else if (updatedProduct) {
      this.updateItemInCart.emit(updatedProduct);
    }
  }

  increment(selectedProduct: selectableProduct) {
    this.productService.incrementProduct(selectedProduct);
    const updatedProduct = this.productService.getProductByName(selectedProduct.item.name);
    if (updatedProduct) {
      this.updateItemInCart.emit(updatedProduct);
    }
  }
}

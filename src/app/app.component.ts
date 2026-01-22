import { Component, inject } from '@angular/core';
import { ProductListComponent } from "./product/product-list/product-list.component";
import { CartComponent } from "./cart/cart.component";
import { selectableProduct } from './models/product';
import { ModalOrderComponent } from "./modal-order/modal-order.component";
import { ProductService } from './services/Product.service';
import { CartService } from './services/Cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, CartComponent, ModalOrderComponent],
  template: `
  @if (cartService.orderConfirmed()) {
    <div class="overlay">
      <app-modal-order (onOrderNew)="resetOrder($event)" [orderedItems]="cartService.items()" />
   </div>
  }
    <main>
       <h1> Desserts</h1>
       <app-product-list 
        (addItemsToCart)="addToCart($event)"
        (updateItemInCart)="updateCart($event)"
        (deleteItemFromCart)="deleteItemFromCart($event)"/>
    </main>
    <aside>
      <app-cart 
       (onConfirmOrder)="order($event)"
       (onRemoveItem)="deleteItemFromCart($event)"/>
      <h3></h3>
    </aside>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  productService = inject(ProductService);
  cartService = inject(CartService);

  addToCart(selectedItem: selectableProduct) {
    this.cartService.addItem(selectedItem);
  }

  updateCart(selectedItem: selectableProduct) {
    this.cartService.addItem(selectedItem);
  }

  deleteItemFromCart(selectedItem: selectableProduct) {
    // Supprime du panier
    this.cartService.removeItem(selectedItem.item.name);
    // Réinitialise le produit dans le service
    this.productService.resetProduct(selectedItem.item.name);
  }

  order(isOrdering: boolean) {
    this.cartService.confirmOrder();
  }

  resetOrder(isOrdered: boolean) {
    // Réinitialise la commande et le panier
    this.cartService.resetOrder();
    // Réinitialise tous les produits
    this.productService.resetAllProducts();
  }
  
}
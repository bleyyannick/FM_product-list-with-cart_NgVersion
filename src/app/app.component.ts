import { Component, signal } from '@angular/core';
import { ProductListComponent } from "./product/product-list/product-list.component";
import { CartComponent } from "./cart/cart.component";
import { selectableProduct } from './models/product';
import { ModalOrderComponent } from "./modal-order/modal-order.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, CartComponent, ModalOrderComponent],
  template: `
  @if (isConfirmed()) {
    <div class="overlay">
      <app-modal-order (onOrderNew)="resetOrder($event)" [orderedItems]="addedItems()" />
   </div>
  }
    <main>
       <h1> Desserts</h1>
       <app-product-list 
        (addItemsToCart)="addToCart($event)"
        (deleteItemFromCart)="deleteItemFromCart($event)"/>
    </main>
    <aside>
      <app-cart 
       (onConfirmOrder)="order($event)"
       (onRemoveItem)="deleteItemFromCart($event)"
       [itemsInCart]="addedItems()"
       [orderedCart]="isConfirmed()"/>
      <h3></h3>
    </aside>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  addedItems = signal<selectableProduct[]>([]);
  isConfirmed = signal<boolean>(false);
  productList= signal<selectableProduct[]>([]);

  addToCart(selectedItem: selectableProduct) {
    this.addedItems.update(items => [...items, selectedItem]);
  }

  deleteItemFromCart(selectedItem: selectableProduct) {
  // Supprime du panier
  this.addedItems.update(items =>
    items.filter(p => p.item.name !== selectedItem.item.name)
  );
  this.productList.update(products =>
      products.map(p =>
        p.item.name === selectedItem.item.name
          ? { ...p, quantity: 0, isSelected: false }
          : p
      )
    );
  }

  order(isOrdering: boolean) {
    this.isConfirmed.set(isOrdering);
  }

  resetOrder(isOrdered: boolean) {
    this.isConfirmed.set(isOrdered);
    this.addedItems.update((items)=> {
      items.map((item) => {
        item.quantity = 0
        item.isSelected = isOrdered
      })
      items.splice(0, items.length);
      return [...items];
      
    });
  }
  
}
import { Component, signal } from '@angular/core';
import { ProductListComponent } from "./product/product-list/product-list.component";
import { CartComponent } from "./cart/cart.component";
import { selectableProduct } from './models/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductListComponent, CartComponent],
  template: `
  @if (isConfirmed()) {
    <div class="overlay">
      <app-cart [itemsInCart]="addedItems()" />
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
       [itemsInCart]="addedItems()"/>
      <h3></h3>
    </aside>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  addedItems = signal<selectableProduct[]>([]);
  isConfirmed = signal<boolean>(false);

  addToCart(selectedItem: selectableProduct) {
    this.addedItems.update((items) => { 
      items.push(selectedItem);
      return [...items];
    });
  }

  deleteItemFromCart(selectedItem: selectableProduct) {
    this.addedItems.update((items) => {
      const index = items.findIndex(({item}) => item.name === selectedItem.item.name); 
      items.splice(index, 1);
      return [...items];
    });
  }

  order(isOrdering: boolean) {
    this.isConfirmed.update(() => isOrdering);
  }
  
}
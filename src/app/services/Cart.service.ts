import { Injectable, signal, computed } from '@angular/core';
import { selectableProduct } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = signal<selectableProduct[]>([]);
  private isOrderConfirmed = signal<boolean>(false);


  items = computed(() => this.cartItems());
  totalQuantity = computed(() => 
    this.cartItems().reduce((acc, { quantity }) => acc + quantity, 0)
  );
  totalAmount = computed(() =>
    this.cartItems().reduce((acc, { item: { price }, quantity }) => 
      acc + price * quantity, 0
    )
  );
  orderConfirmed = computed(() => this.isOrderConfirmed());
  isEmpty = computed(() => this.cartItems().length === 0);

  addItem(item: selectableProduct): void {
    this.cartItems.update(items => {
      const existingItem = items.find(i => i.item.name === item.item.name);
      if (existingItem) {
        return items.map(i => 
          i.item.name === item.item.name 
            ? { ...i, quantity: item.quantity, isSelected: item.isSelected }
            : i
        );
      }
      return [...items, item];
    });
  }

  removeItem(itemName: string): void {
    this.cartItems.update(items =>
      items.filter(item => item.item.name !== itemName)
    );
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  confirmOrder(): void {
    this.isOrderConfirmed.set(true);
  }

  resetOrder(): void {
    this.isOrderConfirmed.set(false);
    this.clearCart();
  }

  getItemByName(name: string): selectableProduct | undefined {
    return this.cartItems().find(item => item.item.name === name);
  }

  getButtonMessage(): string {
    return this.isOrderConfirmed() ? 'start new order' : 'Confirm order';
  }
}
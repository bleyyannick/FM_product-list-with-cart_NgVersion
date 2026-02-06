import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { selectableProduct } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  item = input.required<selectableProduct>();
  onAddCart = output<selectableProduct>();
  onIncrement = output<selectableProduct>();
  onDecrement = output<selectableProduct>();
  
  isSelectableProduct = computed(() => this.item().isSelected);

  updateCart(action: 'add' | 'increment' | 'decrement') {
    const eventMap = {
      'add': this.onAddCart,
      'increment': this.onIncrement,
      'decrement': this.onDecrement
    };
    eventMap[action].emit(this.item());
  }
}

import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { selectableProduct } from '../models/product';

@Component({
  selector: 'app-modal-order',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './modal-order.component.html',
  styleUrl: './modal-order.component.css'
})
export class ModalOrderComponent {
  orderedItems = input.required<selectableProduct[]>();
  onOrderNew = output<boolean>();

  getImagePath(category: string) {
    const formattedCategory = category
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .split(" ")
      .join('-');
    
    if (category === 'Pie') {
      return 'assets/images/image-meringue-mobile.jpg';
    }
    return 'assets/images/image-' + formattedCategory + '-mobile.jpg'; 
  }

  getTotal() {
    return this.orderedItems().reduce(
      (acc, { item: { price }, quantity }) => acc + (price * quantity),
      0
    );
  }

  startNewOrder() {
    this.onOrderNew.emit(false);
  }
}

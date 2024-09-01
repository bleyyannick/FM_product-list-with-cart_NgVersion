import { Component, input, output } from '@angular/core';
import { selectableProduct } from '../models/product';

@Component({
  selector: 'app-modal-order',
  standalone: true,
  imports: [],
  template: `
  <div class="modal">
      <div class="modal-message">
        <img src="assets/images/icon-order-confirmed.svg" alt="check icon">
        <h2>Order Confirmed</h2>
        <p>We hope you enjour your food</p>
      </div>
      <div class="modal-items">
        <ul>
          @for( item of orderedItems(); track item.item.name) {
          <li>
            <div>
              <img [src]="getImagePath(item.item.category)" [alt]="'assets/images/image-' + item.item.category.toLowerCase().split('-') + '-mobile.jpg'">
                <div>
                  <h3>{{item.item.name}}</h3>
                  <div>
                    <span>{{item.quantity}}x </span>
                    <span>{{"@ $" + item.item.price}}</span>
                  </div>
                </div>
            </div>
              <p class="modal-items-price">{{"$" + item.item.price}}</p>
          </li>
              }
          </ul>
        <div class="modal-order">
          <p>Order total</p>
          <p>{{"$" + getTotal()}}</p>
        </div>
      </div>
      <button (click)="startNewOrder()"> Start new order</button>
  </div>
  `,
  styleUrl: './modal-order.component.css'
})
export class ModalOrderComponent {

  orderedItems = input.required<selectableProduct[]>();
  onOrderNew = output<boolean>();

  getImagePath(category: string) {
    const formattedCategory= category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(" ").join('-');
    if(category === 'Pie') {
      return 'assets/images/image-meringue-mobile.jpg';
    }
    return 'assets/images/image-' + formattedCategory + '-mobile.jpg'; 
  }

  getTotal() {
    return this.orderedItems().reduce((acc, {item: {price}, quantity}) => {
      return acc + (price * quantity);
    }, 0);
  }

  startNewOrder() {
    this.onOrderNew.emit(false);
  }

}

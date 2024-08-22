import { Component, input } from '@angular/core';
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
            <img [src]="getImagePath(item.item.category)" [alt]="'assets/images/image-' + item.item.category.toLowerCase().split('-') + '-mobile.jpg'">
            <div>
              <h3>{{item.item.name}}</h3>
            </div>
            <p>{{"$" + item.item.price}}</p>
        </li>
        }
      </ul>
    </div>
    <div>
    </div>

  </div>
  `,
  styleUrl: './modal-order.component.css'
})
export class ModalOrderComponent {

  orderedItems = input.required<selectableProduct[]>();


  ngOnInit() {

  }


  getImagePath(category: string) {
    
    const formattedCategory= category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().split(" ").join('-');
    if(category === 'Pie') {
      return 'assets/images/image-meringue-mobile.jpg';
    }
    return 'assets/images/image-' + formattedCategory + '-mobile.jpg';

   

    
  }

}

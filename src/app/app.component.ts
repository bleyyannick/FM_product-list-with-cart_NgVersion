import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
 import  data  from '../assets/data.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main>
      <img [src]="thumbnail" alt="thumbnail" />
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FM_product-list-with-cart';
  data:any = data;
  thumbnail = this.data[0].image.thumbnail;

   constructor() {
  }
}
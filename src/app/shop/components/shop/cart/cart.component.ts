import { Component, inject } from '@angular/core';
import { CartStore } from '../../../stores/cart.store';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartStore = inject(CartStore);
}

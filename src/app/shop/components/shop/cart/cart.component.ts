import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CartStore } from '../../../stores/cart.store';

@Component({
  selector: 'app-cart',
  imports: [DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  cartStore = inject(CartStore);

  isOpen = signal<boolean>(false);

  toggleCart() {
    this.isOpen.set(!this.isOpen());
  }

  increaseQuantity(productId: number) {
    this.cartStore.increaseQuantity(productId);
  }
  decreaseQuantity(productId: number) {
    this.cartStore.decreaseQuantity(productId);
  }

  removeItem(productId: number) {
    this.cartStore.removeItem(productId);
  }
}

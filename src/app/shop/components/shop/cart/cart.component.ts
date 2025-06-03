import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartStore } from '../../../stores/cart.store';
import { CartItem } from '../../../../models/cartItem.model';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
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

  onHandleIncreaseQuantity(productId: number) {
    this.cartStore.increaseQuantity(productId);
  }

  onHandleDecreaseQuantity(item: CartItem, productId: number) {
    if (item.quantity > 1) {
      this.cartStore.decreaseQuantity(productId);
    } else {
      this.cartStore.removeItem(productId);
    }
  }

  removeItem(productId: number) {
    this.cartStore.removeItem(productId);
  }
}

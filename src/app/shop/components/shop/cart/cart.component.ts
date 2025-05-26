import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CartStore } from '../../../stores/cart.store';

@Component({
  selector: 'app-cart',
  imports: [],
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
}

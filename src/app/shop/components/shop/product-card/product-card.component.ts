import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Product } from '../../../../models/product.model';
import { ProductStore } from '../../../stores/product.store';
import { Router } from '@angular/router';
import { UserStore } from '../../../../auth.store';
import { CartStore } from '../../../stores/cart.store';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  router = inject(Router);
  productStore = inject(ProductStore);
  cartStore = inject(CartStore);
  userStore = inject(UserStore);
  product = input.required<Product>();

  deleteProduct(id: number) {
    this.productStore.deleteProduct(id);
  }

  navigateToProduct(id: number) {
    this.router.navigateByUrl(`/edit/${id}`);
  }

  addToCart(product: Product) {
    this.cartStore.addItem({ product, quantity: 1 });
  }
}

import { Component, inject, signal } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductStore } from '../../stores/product.store';
import { UserStore } from '../../../auth.store';
import { AddProductComponent } from './add-product/add-product.component';
import { CartComponent } from './cart/cart.component';
import { CartStore } from '../../stores/cart.store';

@Component({
  selector: 'app-shop',
  imports: [ProductListComponent, AddProductComponent, CartComponent],
  providers: [CartStore],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  userStore = inject(UserStore);
  productStore = inject(ProductStore);
  cartStore = inject(CartStore);
  showAddProduct = signal<boolean>(false);

  handleAddProduct() {
    this.showAddProduct.set(!this.showAddProduct());
  }
}

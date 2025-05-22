import { Component, inject, signal } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductStore } from '../../stores/product.store';
import { UserStore } from '../../../auth.store';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-shop',
  imports: [ProductListComponent, AddProductComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  userStore = inject(UserStore);
  productStore = inject(ProductStore);
  showAddProduct = signal<boolean>(false);

  handleAddProduct() {
    this.showAddProduct.set(!this.showAddProduct());
  }
}

import { Component, computed, inject, OnInit } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductStore } from '../../stores/product.store';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-shop',
  imports: [ProductListComponent],
  providers: [ProductStore],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  productStore = inject(ProductStore);

  products = computed(() => this.productStore.getProducts());

  handleAddProduct() {
    const product: Product = {
      id: 4000,
      title: 'New Product',
      price: 33,
      description: 'New Product Description',
      category: 'New Category',
      image: 'https://jsonurl.org/img/logo.png',
    };
    this.productStore.addProduct(product);
  }
}

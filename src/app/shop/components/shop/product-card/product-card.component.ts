import { Component, inject, input } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { ProductStore } from '../../../stores/product.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  router = inject(Router);
  productStore = inject(ProductStore);
  product = input.required<Product>();

  deleteProduct(id: number) {
    this.productStore.deleteProduct(id);
  }

  navigateToProduct(id: number) {
    this.router.navigateByUrl(`/shop/edit/${id}`);
  }
}

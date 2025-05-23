import { Component, inject, input } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductStore } from '../../../stores/product.store';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  productStore = inject(ProductStore);

  products = input.required<Product[]>();
}

import { Component } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-shop',
  imports: [ProductListComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {}

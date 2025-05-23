import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { ProductStore } from './stores/product.store';

@Component({
  selector: 'app-shop-layout',
  imports: [RouterOutlet, HeaderComponent],
  providers: [ProductStore],
  templateUrl: './shop-layout.component.html',
})
export class ShopLayoutComponent {}

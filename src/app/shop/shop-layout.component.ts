import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';

@Component({
  selector: 'app-shop-layout',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './shop-layout.component.html',
})
export class ShopLayoutComponent {}

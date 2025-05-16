import { Routes } from '@angular/router';
import { ShopLayoutComponent } from './shop-layout.component';
import { ShopComponent } from './components/shop/shop.component';

export const shopRoutes: Routes = [
  {
    path: '',
    component: ShopLayoutComponent,
    children: [
      {
        path: '',
        component: ShopComponent,
      },
    ],
  },
];

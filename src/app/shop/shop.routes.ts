import { Routes } from '@angular/router';
import { ShopLayoutComponent } from './shop-layout.component';
import { ShopComponent } from './components/shop/shop.component';
import { AddProductComponent } from './components/shop/add-product/add-product.component';

export const shopRoutes: Routes = [
  {
    path: '',
    component: ShopLayoutComponent,
    children: [
      {
        path: '',
        component: ShopComponent,
      },
      {
        path: 'edit/:id',
        component: AddProductComponent,
      },
      {
        path: 'add-product',
        component: AddProductComponent,
      },
    ],
  },
];

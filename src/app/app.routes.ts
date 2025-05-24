import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./shop/shop.routes').then((mod) => mod.shopRoutes),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

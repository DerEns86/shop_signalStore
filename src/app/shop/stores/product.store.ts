import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '../../models/product.model';
import { inject } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import { catchError } from 'rxjs';

type ProductState = {
  products: Product[];
};

const initialState: ProductState = {
  products: [],
};

export const ProductStore = signalStore(
  withState(initialState),
  // withComputed ?
  withMethods((store, productService = inject(ProductApiService)) => ({
    loadProducts: () => {
      productService
        .fetchProducts()
        .pipe(
          catchError((err) => {
            console.log('error', err);
            return [];
          })
        )
        .subscribe((products: Product[]) => {
          patchState(store, { products });
        });
    },
    addProduct: (product: Product) => {
      productService.addProduct(product).subscribe((newProduct: Product) => {
        patchState(store, { products: [newProduct, ...store.products()] });
      });
    },

    getProducts: () => store.products(),
    getProductById: (id: number) => store.products().find((p) => p.id === id),
  })),
  withHooks((store) => ({
    onInit: () => {
      store.loadProducts();
    },
  }))
);

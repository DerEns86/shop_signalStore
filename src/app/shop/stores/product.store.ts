import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '../../models/product.model';
import { inject } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import { pipe, switchMap, tap, catchError, of } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

type ProductState = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  products: [],
  isLoading: false,
  error: null,
};

export const ProductStore = signalStore(
  withState(initialState),
  withMethods((store, productService = inject(ProductApiService)) => ({
    // loadProducts: rxMethod<void>(
    //   pipe(
    //     tap(() => patchState(store, { isLoading: true, error: null })),
    //     switchMap(() =>
    //       productService.getProducts().pipe(
    //         tap((products) =>
    //           patchState(store, { products, isLoading: false })
    //         ),
    //         catchError((err) => {
    //           console.error('Error loading products:', err);
    //           patchState(store, {
    //             error: err.message || 'Produkte konnten nicht geladen werden.',
    //             isLoading: false,
    //           });
    //           return of([]);
    //         })
    //       )
    //     )
    //   )
    // ),

    loadProducts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() =>
          productService.getProducts().pipe(
            tapResponse({
              next: (products) =>
                patchState(store, { products, isLoading: false }),
              error: (err) => {
                console.error('Error loading products:', err);
                patchState(store, {
                  error:
                    err instanceof Error
                      ? err.message
                      : 'Produkte konnten nicht geladen werden.',
                  isLoading: false,
                });
              },
            })
          )
        )
      )
    ),
    deleteProduct: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((productIdToDelete) =>
          productService.deleteProduct(productIdToDelete).pipe(
            tap(() => {
              const filteredProducts = store
                .products()
                .filter((p) => p.id !== productIdToDelete);

              patchState(store, {
                products: filteredProducts,
                isLoading: false,
              });
            }),
            catchError((err) => {
              console.error('Error deleting product:', err);
              patchState(store, {
                error: err.message || 'Produkt konnte nicht gelöscht werden.',
                isLoading: false,
              });
              return of(null);
            })
          )
        )
      )
    ),

    getProductById: (id: number) => store.products().find((p) => p.id === id),
    clearError: () => patchState(store, { error: null }),
  })),

  withHooks((store) => ({
    onInit: () => {
      console.log('ProductStore initialisiert, lade Produkte...');
      store.loadProducts();
    },
    onDestroy: () => {
      console.log('ProductStore zerstört.');
    },
  }))
);

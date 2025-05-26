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
  {
    providedIn: 'root',
  },
  withState(initialState),
  withMethods((store, productService = inject(ProductApiService)) => ({
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

    addProduct: rxMethod<Product>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((productToAdd) =>
          productService.addProduct(productToAdd).pipe(
            tap((newProduct) => {
              patchState(store, {
                products: [newProduct, ...store.products()],
                isLoading: false,
              });
            }),
            catchError((err) => {
              console.error('Error adding product:', err);
              patchState(store, {
                error:
                  err.message || 'Produkt konnte nicht hinzugefügt werden.',
                isLoading: false,
              });
              return of(null);
            })
          )
        )
      )
    ),

    updateProduct: rxMethod<Product>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((productToUpdate) =>
          productService.updateProduct(productToUpdate).pipe(
            tap((updatedProduct) => {
              const updatedProducts = store
                .products()
                .map((p) => (p.id === updatedProduct.id ? updatedProduct : p));

              patchState(store, {
                products: updatedProducts,
                isLoading: false,
              });
            }),
            catchError((err) => {
              console.error('Error updating product:', err);
              patchState(store, {
                error:
                  err.message || 'Produkt konnte nicht aktualisiert werden.',
                isLoading: false,
              });
              return of(null);
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

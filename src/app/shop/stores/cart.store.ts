import {
  signalStore,
  withComputed,
  withMethods,
  patchState,
  withHooks,
} from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { CartItem } from '../../models/cartItem.model';
import { computed } from '@angular/core';

export const CartStore = signalStore(
  withEntities<CartItem>(),
  withComputed((store) => ({
    itemPrice: computed(
      () => (item: CartItem) => item.product.price * item.quantity
    ),

    totalQuantity: computed(() =>
      store.entities().reduce((sum, i) => sum + i.quantity, 0)
    ),

    totalPrice: computed(() =>
      store.entities().reduce((sum, i) => sum + i.quantity * i.product.price, 0)
    ),
  })),
  withMethods((store) => ({
    addItem(item: CartItem): void {
      const existingItem = store
        .entities()
        .find((i) => i.product.id === item.product.id);
      if (!existingItem) {
        patchState(store, addEntity(item));
      } else {
        patchState(
          store,
          updateEntity({
            id: existingItem.id,
            changes: { quantity: existingItem.quantity + item.quantity },
          })
        );
      }
    },
    increaseQuantity: (productId: number) => {
      patchState(
        store,
        updateEntity({
          id: productId,
          changes: (item) => ({ quantity: item.quantity + 1 }),
        })
      );
    },
    decreaseQuantity: (productId: number) => {
      patchState(
        store,
        updateEntity({
          id: productId,
          changes: (item) => ({ quantity: item.quantity - 1 }),
        })
      );
    },
    removeItem: (productId: number) => {
      patchState(store, removeEntity(productId));
    },
  })),
  withHooks(() => ({
    onInit: () => {
      console.log('CartStore initialisiert');
    },
    onDestroy: () => {
      console.log('CartStore zerstört');
    },
  }))
);

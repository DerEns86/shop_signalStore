import {
  signalStore,
  withComputed,
  withMethods,
  withState,
  patchState,
  withHooks,
} from '@ngrx/signals';
import { CartItem } from '../../models/cartItem.model';
import { computed } from '@angular/core';

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

export const CartStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    itemPrice: computed(
      () => (item: CartItem) => item.product.price * item.quantity
    ),
    totalQuantity: computed(() =>
      store.items().reduce((sum, i) => sum + i.quantity, 0)
    ),
    totalPrice: computed(() =>
      store.items().reduce((sum, i) => sum + i.quantity * i.product.price, 0)
    ),
  })),
  withMethods((store) => ({
    addItem: (item: CartItem) => {
      const existingItem = store
        .items()
        .find((i) => i.product.id === item.product.id);
      if (existingItem) {
        patchState(store, {
          items: store
            .items()
            .map((i) =>
              i.product.id === item.product.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
        });
      } else {
        patchState(store, { items: [...store.items(), item] });
      }
    },
    increaseQuantity: (productId: number) => {
      patchState(store, {
        items: store
          .items()
          .map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
      });
    },
    decreaseQuantity: (productId: number) => {
      patchState(store, {
        items: store
          .items()
          .map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item
          ),
      });
    },
    removeItem: (productId: number) => {
      patchState(store, {
        items: store.items().filter((item) => item.product.id !== productId),
      });
    },
  })),
  withHooks((store) => ({
    onInit: () => {
      console.log('CartStore initialisiert');
    },
    onDestroy: () => {
      console.log('CartStore zerstört');
    },
  }))
);

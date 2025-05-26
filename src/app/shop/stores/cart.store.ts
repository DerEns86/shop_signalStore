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
  totalQuantity: number;
  totalPrice: number;
};

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const CartStore = signalStore(
  withState(initialState),
  withComputed(() => ({
    itemPrice: computed(
      () => (item: CartItem) => item.product.price * item.quantity
    ),
  })),
  withMethods((store) => ({
    addItem: (item: CartItem) => {
      const existingItem = store
        .items()
        .find((i) => i.product.id === item.product.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        patchState(store, { items: [...store.items(), item] });
      }
      patchState(store, {
        totalQuantity: store.totalQuantity() + item.quantity,
      });
      patchState(store, {
        totalPrice: store.totalPrice() + store.itemPrice()(item),
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

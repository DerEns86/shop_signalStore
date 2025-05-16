import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type UserState = {
  isAuthenticated: boolean;
  role: 'Customer' | 'Seller' | undefined;
};

const initialState: UserState = {
  isAuthenticated: false,
  role: undefined,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    login(role: 'Customer' | 'Seller') {
      patchState(store, { role: role, isAuthenticated: true });
    },
    logout() {
      patchState(store, { role: undefined, isAuthenticated: false });
    },
    getUser() {
      return {
        isAuthenticated: store.isAuthenticated(),
        role: store.role(),
      };
    },
  }))
);

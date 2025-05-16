import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { UserRole } from './user.model';

type UserState = {
  isAuthenticated: boolean;
  role: UserRole | undefined;
};

const initialState: UserState = {
  isAuthenticated: false,
  role: undefined,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    login(role: UserRole) {
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

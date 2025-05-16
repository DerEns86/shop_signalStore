export enum UserRole {
  Customer = 'Customer',
  Seller = 'Seller',
}

export interface User {
  isAuthenticated: boolean;
  role: UserRole;
}

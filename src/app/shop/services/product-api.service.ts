import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private http: HttpClient = inject(HttpClient);

  private readonly apiUrl = 'https://fakestoreapi.com/products';

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product) {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(productId: number) {
    return this.http.delete<Product>(`${this.apiUrl}/${productId}`);
  }
}

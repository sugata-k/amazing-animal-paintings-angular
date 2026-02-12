import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  private api_url = environment.api_url + '/cart';
  private api_checkout_url = environment.api_url + '/checkout';

  addToCart(product: Product) {
    return this.http.post<Product>(this.api_url, product);
  }

  getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api_url);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.api_url);
  }

  checkout(products: Product[]): Observable<void> {
    return this.http.post<void>(this.api_checkout_url, products);
  }
}


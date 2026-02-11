import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private api_url = environment.api_url + '/products';

  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.api_url);
  }
}

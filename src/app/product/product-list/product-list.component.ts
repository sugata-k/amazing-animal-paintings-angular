import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from '../product.service';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) { }

  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder = "";

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product).subscribe(() => {
      this.snackBar.open(`${product.name} added to cart!`, '', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    });
  }

  applyFilter(event: Event) {
    let searchText = (event.target as HTMLInputElement).value;
    searchText = searchText.trim().toLowerCase();

    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(searchText)
    );

    this.sortProducts(this.sortOrder);
  }

  sortProducts(sortBy: string) {
    if (sortBy === 'priceLowHigh') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHighLow') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}
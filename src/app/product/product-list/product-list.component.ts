import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../../models/product";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { FlexModule } from "@angular/flex-layout";
import { CartService } from "../../cart/cart.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FlexModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.css",
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder: string = "";
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCard(product).subscribe({
      next: () => {
        this.snackbar.open("Product added to cart", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "bottom",
        });
      },
    });
  }

  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLocaleLowerCase();

    this.filteredProducts = this.products.filter((product) => {
      return product.name.toLocaleLowerCase().includes(searchTerm);
    });

    this.sortProducts(this.sortOrder);
  }

  sortProducts(sortValue: string): void {
    if (sortValue === "priceLowHigh") {
      this.filteredProducts = this.filteredProducts.sort(
        (a, b) => a.price - b.price
      );
    } else if (sortValue === "priceHighLow") {
      this.filteredProducts = this.filteredProducts.sort(
        (a, b) => b.price - a.price
      );
    }
  }
}

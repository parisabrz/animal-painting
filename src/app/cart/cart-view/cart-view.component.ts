import { Component, OnInit } from "@angular/core";
import { CartService } from "../cart.service";
import { Product } from "../../models/product";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-cart-view",
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatListModule, CommonModule],
  templateUrl: "./cart-view.component.html",
  styleUrl: "./cart-view.component.css",
})
export class CartViewComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCardItem().subscribe((data) => {
      this.cartItems = data;
      this.totalPrice = this.getTotalPrice();
    });
  }

  getTotalPrice(): number {
    let total = 0;
    this.cartItems.forEach((item) => {
      total += item.price;
    });
    return total;
  }

  clearCart(): void {
    this.cartService.clearCard().subscribe(() => {
      this.cartItems = [];
      this.totalPrice = 0;
    });
  }

  checkout(): void {
    this.cartService.checkout(this.cartItems).subscribe(() => {
      this.cartItems = [];
      this.totalPrice = 0;
    });
  }
}

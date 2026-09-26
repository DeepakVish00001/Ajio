import { Component, inject, input } from '@angular/core';
import { CartItems } from '../../../shared/models/cart';
import { RouterLink } from '@angular/router';
import { MatButton, MatIconButton, MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { CartServices } from '../../../core/services/cart.services';

@Component({
  selector: 'app-cart-item',
  imports: [
    RouterLink,
    MatIcon,
    MatIconButton,
    MatButton,
    CurrencyPipe,
    MatAnchor
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  item = input.required<CartItems>();
  carServices = inject(CartServices);


  incrementQuantity() {
    this.carServices.addItemToCart(this.item())
  }

  decrementQuantity() {
    this.carServices.removeItemFromCart(this.item().productId);
  }

  removeItemFromCart() {
    this.carServices.removeItemFromCart(this.item().productId, this.item().quantity);
  }
}

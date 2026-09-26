import { Component, inject } from '@angular/core';
import { CartServices } from '../../core/services/cart.services';
import { CartItemComponent } from './cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  imports: [
    CartItemComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartServices = inject(CartServices)
}

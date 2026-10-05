import { Component, inject } from '@angular/core';
import { CartServices } from '../../../core/services/cart.services';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout-review',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.css',
})
export class CheckoutReviewComponent {
  cartService = inject(CartServices);
}

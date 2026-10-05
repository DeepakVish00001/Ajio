import { Component, inject, OnInit } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { CheckoutServices } from '../../../core/services/checkout.services';
import { CurrencyPipe } from '@angular/common';
import { CartServices } from '../../../core/services/cart.services';
import { DeliveryMethod } from '../../../shared/models/deliveryMethod';

@Component({
  selector: 'app-checkout-delivery',
  imports: [
    MatRadioModule,
    CurrencyPipe
  ],
  templateUrl: './checkout-delivery.html',
  styleUrl: './checkout-delivery.css',
})
export class CheckoutDelivery implements OnInit {

  checkoutService = inject(CheckoutServices);
  cartService = inject(CartServices);

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethod().subscribe({
      next: methods => {
        if (this.cartService.cart()?.deliveryMethodId) {
          const method = methods.find(x => x.id === this.cartService.cart()?.deliveryMethodId)

          if (method) {
            this.cartService.selectedDelivery.set(method);
          }
        }
      }
    })
  }

  updateDeliveryMethods(method: DeliveryMethod) {
    this.cartService.selectedDelivery.set(method);
    const cart = this.cartService.cart();
    if (cart) {
      cart.deliveryMethodId = method.id,
        this.cartService.setCart(cart);
    }
  }
}

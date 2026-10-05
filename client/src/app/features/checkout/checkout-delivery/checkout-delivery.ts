import { Component, inject, OnInit } from '@angular/core';
import { CheckoutServices } from '../../../core/services/checkout.services';

@Component({
  selector: 'app-checkout-delivery',
  imports: [],
  templateUrl: './checkout-delivery.html',
  styleUrl: './checkout-delivery.css',
})
export class CheckoutDelivery implements OnInit {
  
  checkoutService=inject(CheckoutServices);

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethod().subscribe()  
  }
}

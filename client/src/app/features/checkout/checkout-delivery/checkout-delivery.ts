import { Component, inject, OnInit } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { CheckoutServices } from '../../../core/services/checkout.services';
import { CurrencyPipe } from '@angular/common';

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
  
  checkoutService=inject(CheckoutServices);

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethod().subscribe()  
  }
}

import { Component, inject, OnDestroy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SignalrServices } from '../../../core/services/signalr.services';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AddressPipe } from '../../../shared/pipes/address-pipe';
import { PaymentCardPipe } from '../../../shared/pipes/payment-card-pipe';
import { OrderServices } from '../../../core/services/order.services';

@Component({
  selector: 'app-checkout-success',
  imports: [
    RouterLink,
    MatButton,
    MatProgressSpinnerModule,
    DatePipe,
    CurrencyPipe,
    AddressPipe,
    PaymentCardPipe
  ],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.css',
})
export class CheckoutSuccess implements OnDestroy {

  signalrService = inject(SignalrServices);
  private orderService = inject(OrderServices);

  ngOnDestroy(): void {
    this.orderService.orderComplete=false;

    this.signalrService.orderSignal.set(null);
  }

}

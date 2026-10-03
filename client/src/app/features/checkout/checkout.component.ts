import { Component, inject, OnInit } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { OrderSummaryComponent } from '../../shared/components/order-summary/order-summary.component';
import { RouterLink } from '@angular/router';
import { MatAnchor, MatButton } from '@angular/material/button';
import { StripeServices } from '../../core/services/stripe.services';
import { StripeAddressElement } from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout',
  imports: [
    OrderSummaryComponent,
    MatStepperModule,
    RouterLink,
    MatAnchor,
    MatButton,
    RouterLink
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {

  private stripeServices = inject(StripeServices);
  addressElements?: StripeAddressElement

  async ngOnInit() {
    try {
      this.addressElements = await this.stripeServices.createAddressElements();
      this.addressElements.mount('#address-element')
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

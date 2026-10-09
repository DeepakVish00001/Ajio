import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { OrderSummaryComponent } from '../../shared/components/order-summary/order-summary.component';
import { RouterLink } from '@angular/router';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { StripeServices } from '../../core/services/stripe.services';
import { ConfirmationToken, StripeAddressElement, StripeAddressElementChangeEvent, StripePaymentElement, StripePaymentElementChangeEvent } from '@stripe/stripe-js';
import { Address } from '../../shared/models/user';
import { firstValueFrom } from 'rxjs';
import { AccountServices } from '../../core/services/account.services';
import { CheckoutDelivery } from './checkout-delivery/checkout-delivery';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CartServices } from '../../core/services/cart.services';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [
    OrderSummaryComponent,
    MatStepperModule,
    RouterLink,
    MatAnchor,
    MatButton,
    MatCheckboxModule,
    CheckoutDelivery,
    CheckoutReviewComponent,
    CurrencyPipe
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit, OnDestroy {

  private stripeServices = inject(StripeServices);
  private accountServices = inject(AccountServices);
  cartService = inject(CartServices);
  addressElements?: StripeAddressElement;
  paymentElement?: StripePaymentElement;



  saveAddress = false;

  completionStatus = signal<{ address: boolean, card: boolean, delivery: boolean }>(
    { address: false, card: false, delivery: false }
  )

  // constructor(){
  //   this.handleAddressChange=this.handleAddressChange.bind(this)
  // }

  confirmationToken?: ConfirmationToken;

  async ngOnInit() {
    try {
      this.addressElements = await this.stripeServices.createAddressElements();
      this.addressElements.mount('#address-element');

      this.addressElements.on('change', this.handleAddressChange)

      this.paymentElement = await this.stripeServices.createPaymentElement();
      this.paymentElement.mount('#payment-element');
      this.paymentElement.on('change', this.handlePaymentChange);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  handleAddressChange = (event: StripeAddressElementChangeEvent) => {
    this.completionStatus.update(state => {
      state.address = event.complete;
      return state;
    })
  }

  handlePaymentChange = (event: StripePaymentElementChangeEvent) => {
    this.completionStatus.update(state => {
      state.card = event.complete;
      return state;
    })
  }

  handleDeliveryChange(event: boolean) {
    this.completionStatus.update(state => {
      state.delivery = event;
      return state;
    })
  }



  onSaveAddressCheckBoxChange(event: MatCheckboxChange) {
    this.saveAddress = event.checked;
  }


  async getConfirmationToken() {
    try {
      if (Object.values(this.completionStatus()).every(status => status === true)) {
        const result = await this.stripeServices.createConfirmationToken();
        if(result.error) throw new Error(result.error.message);
        this.confirmationToken = result.confirmationToken;
        console.log(this.confirmationToken)
      }
    } catch (error: any) {
      console.log(error.message)
    }

  }

  async onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 1) {
      if (this.saveAddress) {
        const address = await this.getAddressFromStripeAddress();
        address && firstValueFrom(this.accountServices.updateAddress(address));
      }
    }
    if (event.selectedIndex === 2) {
      await firstValueFrom(this.stripeServices.createOrUpdatePaymentIntent());
    }
    if(event.selectedIndex===3){
      await this.getConfirmationToken();
    }
  }

  private async getAddressFromStripeAddress(): Promise<Address | null> {
    const retsult = await this.addressElements?.getValue();
    const address = retsult?.value.address;

    if (address) {
      return {
        line1: address.line1,
        line2: address.line2 || undefined,
        city: address.city,
        state: address.state,
        country: address.country,
        postalCode: address.postal_code

      }
    } else return null;
  }

  ngOnDestroy(): void {
    this.stripeServices.disposeElements()
  }

}

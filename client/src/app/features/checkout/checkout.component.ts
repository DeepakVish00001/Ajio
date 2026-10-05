import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { OrderSummaryComponent } from '../../shared/components/order-summary/order-summary.component';
import { RouterLink } from '@angular/router';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { StripeServices } from '../../core/services/stripe.services';
import { StripeAddressElement, StripePaymentElement } from '@stripe/stripe-js';
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
  private accountServices= inject(AccountServices);
  cartService= inject(CartServices);
  addressElements?: StripeAddressElement;
  paymentElement?:StripePaymentElement;

  saveAddress = false;

  async ngOnInit() {
    try {
      this.addressElements = await this.stripeServices.createAddressElements();
      this.addressElements.mount('#address-element');

      this.paymentElement=await this.stripeServices.createPaymentElement();
      this.paymentElement.mount('#payment-element');
    } catch (error: any) {
      console.log(error.message);
    }
  }

 


  onSaveAddressCheckBoxChange(event: MatCheckboxChange) {
    this.saveAddress = event.checked;
  }

  async onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 1) {
      if (this.saveAddress) {
        const address = await this.getAddressFromStripeAddress();
        address && firstValueFrom( this.accountServices.updateAddress(address));
      }
    }
    if(event.selectedIndex===2){
      await firstValueFrom(this.stripeServices.createOrUpdatePaymentIntent());
    }
  }

  private async getAddressFromStripeAddress():Promise<Address | null> {
    const retsult = await this.addressElements?.getValue();
    const address= retsult?.value.address;

    if(address){
      return{
        line1:address.line1,
        line2:address.line2 || undefined,
        city:address.city,
        state:address.state,
        country:address.country,
        postalCode:address.postal_code

      }
    }else return null;
  }

   ngOnDestroy(): void {
    this.stripeServices.disposeElements()
  }

}

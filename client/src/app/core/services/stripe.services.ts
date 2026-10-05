import { inject, Injectable } from '@angular/core';
import { loadStripe, StripeAddressElement, StripeAddressElementOptions, StripeElements, StripePaymentElement, type Stripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { CartServices } from './cart.services';
import { Cart } from '../../shared/models/cart';
import { firstValueFrom, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccountServices } from './account.services';

@Injectable({
  providedIn: 'root',
})
export class StripeServices {
  baseUrl = environment.apiUrl;
  private cartServices = inject(CartServices);
  private accountService = inject(AccountServices);
  private http = inject(HttpClient);
  private stripePromise: Promise<Stripe | null>;

  private elements?: StripeElements;
  private addressElements?: StripeAddressElement;
  private paymentElement?: StripePaymentElement;

  constructor() {
    this.stripePromise = loadStripe(environment.stripePublicableKey);
  }

  getStripeInstance() {
    return this.stripePromise;
  }

  async initializeElements() {
    if (!this.elements) {
      const stripe = await this.getStripeInstance();
      if (stripe) {
        const cart = await firstValueFrom(this.createOrUpdatePaymentIntent());
        this.elements = stripe.elements(
          { clientSecret: cart.clientSecret, appearance: { labels: 'floating' } });
      } else {
        throw new Error('Stripe has not been loaded');
      }
    }
    return this.elements;
  }

  async createPaymentElement() {
    if (!this.paymentElement) {
      const element = await this.initializeElements();
      if (element) {
        this.paymentElement = element.create('payment');
      } else {
        throw new Error('Elements instance has not been initialized')
      }
    }
    return this.paymentElement;
  }

  async createAddressElements() {
    if (!this.addressElements) {
      const user = this.accountService.currentUser();
      let defaultValues: StripeAddressElementOptions['defaultValues'] = {};

      if (user) {
        defaultValues.name = user.firstName + '' + user.lastName
      }
      if (user?.address) {
        defaultValues.address = {
          line1: user.address.line1,
          line2: user.address.line2,
          city: user.address.city,
          state: user.address.state,
          country: user.address.country,
          postal_code: user.address.postalCode

        }
      }


      const elements = await this.initializeElements();
      if (elements) {
        const options: StripeAddressElementOptions = {
          mode: 'shipping',
          defaultValues
        };
        this.addressElements = elements.create('address', options)
      } else {
        throw new Error('Elements instance has not been loaded');
      }
    }
    return this.addressElements;
  }

  createOrUpdatePaymentIntent() {
    const cart = this.cartServices.cart();
    // console.log(cart)
    if (!cart) throw new Error('Problem with cart data');

    return this.http.post<Cart>(this.baseUrl + 'payments/' + cart.id, {}).pipe(
      map(cart => {
        this.cartServices.setCart(cart);
        return cart;
      })
    );
  }

  disposeElements() {
    this.elements = undefined;
    this.addressElements = undefined;
    this.paymentElement = undefined;
  }
}


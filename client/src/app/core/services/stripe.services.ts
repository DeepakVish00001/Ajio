import { inject, Injectable } from '@angular/core';
import { loadStripe, StripeAddressElement, StripeAddressElementOptions, StripeElements, type Stripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { CartServices } from './cart.services';
import { Cart } from '../../shared/models/cart';
import { firstValueFrom, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StripeServices {
  baseUrl = environment.apiUrl;
  private cartServices = inject(CartServices);
  private http = inject(HttpClient);
  private stripePromise: Promise<Stripe | null>;

  private elements?: StripeElements;
  private addressElements?:StripeAddressElement;

  constructor() {
    this.stripePromise = loadStripe(environment.stripePublicableKey);
  }

  getStripeInstance() {
    return this.stripePromise;
  }

  async initializaElements() {
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

  async createAddressElements() {
    if (!this.addressElements) {
      const elements = await this.initializaElements();
      if (elements) {
        const options: StripeAddressElementOptions = {
          mode: 'shipping'
        };
        this.addressElements=elements.create('address',options)
      }else{
        throw new Error('Elements instance has not been loaded');
      }
    }
    return this.addressElements;
  }

  createOrUpdatePaymentIntent() {
    const cart = this.cartServices.cart();
    if (!cart) throw new Error('Problem with cart data');

    return this.http.post<Cart>(this.baseUrl + 'payments', cart.id, {}).pipe(
      map(cart => {
        this.cartServices.cart.set(cart);
        return cart;
      })
    );
  }
}

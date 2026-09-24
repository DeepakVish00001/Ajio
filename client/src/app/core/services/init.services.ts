import { inject, Injectable } from '@angular/core';
import { CartServices } from './cart.services';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitServices {
  private cartService = inject(CartServices);

  init(){
    const cartId=localStorage.getItem('cart_id');
    const cart$ =cartId ? this.cartService.getCart(cartId): of(null)

    return cart$;
  }
}

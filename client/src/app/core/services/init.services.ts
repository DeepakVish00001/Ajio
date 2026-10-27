import { inject, Injectable } from '@angular/core';
import { CartServices } from './cart.services';
import { forkJoin, of, tap } from 'rxjs';
import { AccountServices } from './account.services';
import { SignalrServices } from './signalr.services';

@Injectable({
  providedIn: 'root',
})
export class InitServices {
  private cartService = inject(CartServices);
  private accountService = inject(AccountServices);
  private signalrService=inject(SignalrServices);

  init(){
    const cartId=localStorage.getItem('cart_id');
    const cart$ =cartId ? this.cartService.getCart(cartId): of(null)

    return forkJoin({
      cart: cart$,
      user:this.accountService.getUserInfo().pipe(
        tap(user=>{
          if(user)this.signalrService.createHubConnection();
        })
      )
    })
  }
}

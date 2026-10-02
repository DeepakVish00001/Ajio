import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CartServices } from '../services/cart.services';

export const emptyCartGuardGuard: CanActivateFn = (route, state) => {
  const cartServices= inject(CartServices);
  const router= inject(Router);

  if(!cartServices.cart()||cartServices.cart()?.items.length===0){
    console.log('Cart is empty. Redirecting to cart page.');
    router.navigateByUrl('/cart');
    return false;
  }

  return true;
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OrderServices } from '../services/order.services';

export const orderCompleteGuard: CanActivateFn = (route, state) => {
  const orderService= inject(OrderServices);
  const router= inject(Router);

  if(orderService.orderComplete){
    return true;
  }else{
    router.navigateByUrl('/shop');
    return false;
  }
};

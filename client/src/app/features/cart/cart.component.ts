import { Component, inject } from '@angular/core';
import { CartServices } from '../../core/services/cart.services';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderSummaryComponent } from '../../shared/components/order-summary/order-summary.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-cart',
  imports: [
    CartItemComponent,
    OrderSummaryComponent,
    EmptyStateComponent
],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartServices = inject(CartServices)
}

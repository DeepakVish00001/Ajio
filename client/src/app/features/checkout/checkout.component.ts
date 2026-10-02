import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { OrderSummaryComponent } from '../../shared/components/order-summary/order-summary.component';

@Component({
  selector: 'app-checkout',
  imports: [
    OrderSummaryComponent,
    MatStepperModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {}

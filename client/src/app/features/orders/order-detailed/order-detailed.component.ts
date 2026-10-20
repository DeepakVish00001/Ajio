import { Component, inject, OnInit } from '@angular/core';
import { OrderServices } from '../../../core/services/order.services';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../shared/models/order';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-detailed',
  imports: [
    MatCardModule,
    MatButton,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './order-detailed.component.html',
  styleUrl: './order-detailed.component.css',
})
export class OrderDetailedComponent implements OnInit {


  private orderService = inject(OrderServices);
  private activetedRoute = inject(ActivatedRoute);
  order?: Order;


  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    const id = this.activetedRoute.snapshot.paramMap.get('id');
    if (!id) return;

    this.orderService.getOrderDetailed(+id).subscribe({
      next: order => this.order = order
    })
  }
}

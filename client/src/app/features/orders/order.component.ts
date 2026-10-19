import { Component, inject, OnInit } from '@angular/core';
import { OrderServices } from '../../core/services/order.services';
import { Order } from '../../shared/models/order';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';


@Component({
  selector: 'app-order',
  imports: [
    RouterLink,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {


  private orderService = inject(OrderServices)
  orders: Order[] = [];


  ngOnInit(): void {
    this.orderService.getOrdersForUser().subscribe({
      next: orders => this.orders = orders
    })
  }

}

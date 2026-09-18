import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopServices } from '../../core/services/shop.services';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-shop',
  imports: [
    MatCard
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private shopServices = inject(ShopServices);
  

  products: Product[] = [];

  ngOnInit(): void {
    this.shopServices.getProducts().subscribe({
      next: response => this.products = response.data,
      error: (error: any) => console.log(error)
    })
  }
}

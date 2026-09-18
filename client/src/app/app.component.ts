import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';
import { ShopServices } from './core/services/shop.services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  private shopServices = inject(ShopServices);
  title = 'client';

  products: Product[] = [];

  ngOnInit(): void {
    this.shopServices.getProducts().subscribe({
      next: response => this.products = response.data,
      error: (error: any) => console.log(error)
    })
  }

}

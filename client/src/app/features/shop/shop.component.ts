import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopServices } from '../../core/services/shop.services';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'app-shop',
  imports: [
    ProductItemComponent
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private shopServices = inject(ShopServices);


  products: Product[] = [];

  ngOnInit(): void {
   this.initializeShop()
  }
  initializeShop() {
    this.shopServices.getCategories();
    this.shopServices.getBrands();

     this.shopServices.getProducts().subscribe({
      next: response => this.products = response.data,
      error: (error: any) => console.log(error)
    })
  }
}

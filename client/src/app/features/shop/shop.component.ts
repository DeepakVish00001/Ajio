import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopServices } from '../../core/services/shop.services';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatIcon } from '@angular/material/icon';
import { Category } from '../../shared/models/category';
import { Brands } from '../../shared/models/brands';

@Component({
  selector: 'app-shop',
  imports: [
    ProductItemComponent,
    MatIcon
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private shopServices = inject(ShopServices);


  products: Product[] = [];
  categories:Category[]=[];
  brands:Brands[]=[];

  ngOnInit(): void {
   this.getBrands()
   this.getCategories();
   this.getProducts();
  }


  getProducts(){
 this.shopServices.getProducts().subscribe({
      next: response => this.products = response.data,
      error: (error: any) => console.log(error)
    })
  }
  getCategories(){
     this.shopServices.getCategories().subscribe({
      next: response => this.categories = response,
      error: (error: any) => console.log(error)
    })
  }

    getBrands(){
     this.shopServices.getBrands().subscribe({
      next: response => this.brands = response,
      error: (error: any) => console.log(error)
    })
  }
}

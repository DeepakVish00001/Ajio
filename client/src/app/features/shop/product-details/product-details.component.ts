import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { ShopServices } from '../../../core/services/shop.services';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {

  private shopService = inject(ShopServices);

  private activatedRoute = inject(ActivatedRoute);

  product?: Product;
  // Main image
  selectedImage = '';

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;
    this.shopService.getProduct(+id).subscribe({
      next: product => {
        this.product = product;
           // First image as main image
        this.selectedImage = product.picture?.[0] ?? '';
      },
      error: error => console.log(error)
    })
  }

  selectImage(image:string){
    this.selectedImage= image;
  }
}

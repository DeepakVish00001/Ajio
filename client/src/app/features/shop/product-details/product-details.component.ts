import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { ShopServices } from '../../../core/services/shop.services';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    DecimalPipe,
    DatePipe
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {

  private shopService = inject(ShopServices);

  private activatedRoute = inject(ActivatedRoute);

  product?: Product;
  // Main image
  selectedImageIndex = 0;

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
        this.selectedImageIndex = 0;
      },
      error: error => console.log(error)
    })
  }

  selectImage(index: number) {
    this.selectedImageIndex = index;
  }

  //th
  previousImage() {
    if (!this.product?.picture?.length) return;

    if (this.selectedImageIndex === 0) {
      this.selectedImageIndex = this.product.picture.length - 1;
    } else {
      this.selectedImageIndex--;
    }
  }

  nextImage() {
    if (!this.product?.picture?.length) return;
    if (this.selectedImageIndex === this.product.picture.length - 1) {
      this.selectedImageIndex = 0;
    } else {
      this.selectedImageIndex++;
    }
  }

  onMainImageClick(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;

    const width = element.offsetWidth;
    const clickPosition = event.offsetX

    if (clickPosition < width / 2) {
      this.previousImage();
    } else {
      this.nextImage();
    }
  }

  getRatingPercentage(star: number): number {
    if (!this.product?.totalReviews) {
      return 0;
    }

    const count = this.product.ratingBreakdown?.[star] ?? 0;
    return (count / this.product.totalReviews) * 100
  }
}

import { Component, inject, input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { ShopServices } from '../../../core/services/shop.services';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { CartServices } from '../../../core/services/cart.services';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CartItems } from '../../../shared/models/cart';

@Component({
  selector: 'app-product-details',
  imports: [
    CurrencyPipe,
    DecimalPipe,
    DatePipe,
    MatInput,
    FormsModule,
    RouterLink
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {

  private shopService = inject(ShopServices);

  private activatedRoute = inject(ActivatedRoute);
  private cartServices = inject(CartServices);

  product?: Product;

  quantityInCart = 0;

  quantity = 1;
  isAddedToCart = false;
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
        this.updateQuantityInCart()

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




  updateQuantityInCart() {
    if (!this.product) return;
    const cartItem = this.cartServices.cart()?.items
      .find(x => x.productId === this.product?.id)

    this.quantityInCart = cartItem?.quantity ?? 0
    if (this.quantityInCart > 0) {
      this.quantity = this.quantityInCart;
      this.isAddedToCart = true;
    } else {
      this.quantity = 1;
      this.isAddedToCart = false;
    }

    this.quantity = this.quantityInCart || 1;
  }

  getUpdateCartButton() {
    return this.quantityInCart > 0 ? 'UPDATE CART' : 'ADD TO CART'
  }

  incrementQuantity() {
    if (!this.product) return
    if (this.quantity < this.product.quantityInStock) {
      this.quantity++
    }
  }

  decrementQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  updateCart() {
    if (!this.product) return;

    // Remove all
    if (this.quantity === 0) {
      if (this.quantityInCart > 0) {
        this.cartServices.removeItemFromCart(
          this.product.id,
          this.quantityInCart
        );
      }

      this.quantityInCart = 0;
      this.isAddedToCart = false;
      this.quantity = 1;
      return;
    }

    // ADD TO CART
    if (this.quantityInCart === 0) {

      this.cartServices.addItemToCart(
        {
          productId: this.product.id,
          productName: this.product.name,
          price: this.product.price,
          quantity: this.quantity,
          imageUrl: this.product.picture?.[0] ?? '',
          brand: this.product.productBrand,
          category: this.product.productCategory
        },
        this.quantity
      );

      this.quantityInCart = this.quantity;
      this.isAddedToCart = true;

      return;
    }

    // UPDATE - increase
    if (this.quantity > this.quantityInCart) {

      const difference =
        this.quantity - this.quantityInCart;

      this.cartServices.addItemToCart(
        {
          productId: this.product.id,
          productName: this.product.name,
          price: this.product.price,
          quantity: difference,
          imageUrl: this.product.picture?.[0] ?? '',
          brand: this.product.productBrand,
          category: this.product.productCategory
        },
        difference
      );

      this.quantityInCart = this.quantity;
    }

    // UPDATE - decrease
    else if (this.quantity < this.quantityInCart) {

      const difference =
        this.quantityInCart - this.quantity;

      this.cartServices.removeItemFromCart(
        this.product.id,
        difference
      );

      this.quantityInCart = this.quantity;
    }
  }
}




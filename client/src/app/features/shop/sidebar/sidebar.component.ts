import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ShopServices } from '../../../core/services/shop.services';
import { Category } from '../../../shared/models/category';
import { Brands } from '../../../shared/models/brands';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatIcon,
    FormsModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {

  private shopServices = inject(ShopServices)
  categories: Category[] = [];
  brands: Brands[] = [];

  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: ' Price: Low to High', value: 'priceAsc' },
    { name: ' Price: High to Low', value: 'priceDesc' },
  ]

  @Output() sortSelected = new EventEmitter<string>();
  @Output() categorySelected = new EventEmitter<number>();
  @Output() brandSelected = new EventEmitter<number>();

  minPrice = 0;
  maxPrice = 50000;
  @Output() priceSelected = new EventEmitter<{
    minPrice: number,
    maxPrice: number
  }>();

  ngOnInit(): void {
    this.getCategories();
    this.getBrands();
  }

  getCategories() {
    this.shopServices.getCategories().subscribe({
      next: response => this.categories = [{ id: 0, name: 'All' }, ...response],
      error: (error: any) => console.log(error)
    })
  }

  getBrands() {
    this.shopServices.getBrands().subscribe({
      next: response => this.brands = [{ id: 0, name: 'All' }, ...response],
      error: (error: any) => console.log(error)
    })
  }

  onSortSelected(event: Event) {

    const select = event.target as HTMLSelectElement;

    // ⭐ Parent ko selected sort bhej do
    this.sortSelected.emit(select.value);
  }

  onCategorySelected(categoryId: number) {
    this.categorySelected.emit(categoryId);
  }

  onBrandSelected(brandId: number) {
    this.brandSelected.emit(brandId);
  }

  onMinPriceChange() {
    // const input = event.target as HTMLInputElement;
    // this.minPrice = Number(input.value);
    this.priceSelected.emit({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });
  }

  onMaxPriceChange() {
    // const input = event.target as HTMLInputElement;
    // this.maxPrice = Number(input.value);
    this.priceSelected.emit({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });

  }

  onPriceRangeChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.maxPrice = Number(input.value);
  }


  applyPrice() {
    this.priceSelected.emit({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });
  }

}

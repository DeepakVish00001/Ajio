import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ShopServices } from '../../../core/services/shop.services';
import { Category } from '../../../shared/models/category';
import { Brands } from '../../../shared/models/brands';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatIcon
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  private shopServices = inject(ShopServices)
  categories: Category[] = [];
  brands: Brands[] = [];
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

}

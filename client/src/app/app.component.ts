import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { ShopComponent } from './features/shop/shop.component';
import { MatIcon } from '@angular/material/icon';
import { SidebarComonent } from './features/shop/sidebar/sidebar.comonent';
import { PaginationComonent } from './features/shop/pagination/pagination.comonent';
import { PaginationTwoComonent } from './features/shop/pagination-two/pagination-two.comonent';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComonent,
    PaginationComonent,
    PaginationTwoComonent,
    ShopComponent,
    MatIcon
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'client';

}

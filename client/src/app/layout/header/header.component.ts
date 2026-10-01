import { Component, inject } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { SearchComponent } from '../search/search.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartServices } from '../../core/services/cart.services';
import { AccountServices } from '../../core/services/account.services';


@Component({
  selector: 'app-header',
  imports: [
    SearchComponent,
    MatButton,
    MatIcon,
    MatBadge,
    RouterLink,
    RouterLinkActive,
    MatMenuTrigger,
    MatMenu,
    MatDivider,
    MatMenuItem,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  cartServices = inject(CartServices)
  accountService = inject(AccountServices)
  private router = inject(Router)

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.accountService.currentUser.set(null);
        this.router.navigateByUrl('/shop')

      }
    });
  }


}

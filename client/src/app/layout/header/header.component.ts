import { Component } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SearchComonent } from '../../features/shop/search/search.comonent';

@Component({
  selector: 'app-header',
  imports: [
    SearchComonent,
    MatButton,
    MatIcon,
    MatBadge
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}

import { Component } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SearchComponent } from '../search/search.component';


@Component({
  selector: 'app-header',
  imports: [
    SearchComponent,
    MatButton,
    MatIcon,
    MatBadge
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent { }

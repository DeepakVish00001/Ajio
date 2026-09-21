import { Component } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SearchComponent } from '../search/search.component';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [
    SearchComponent,
    MatButton,
    MatIcon,
    MatBadge,
    RouterLink,
    RouterLinkActive
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {


}

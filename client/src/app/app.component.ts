import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { ShopComponent } from './features/shop/shop.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,ShopComponent,MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'client';

}

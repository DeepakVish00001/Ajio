import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  baseUrl = 'https://localhost:5001/api/'
  private http = inject(HttpClient);
  title = 'client';

  ngOnInit(): void {
    this.http.get(this.baseUrl + 'product').subscribe({
      next: (data: any) => console.log(data),
      error: (error: any) => console.log(error),
      complete: () => console.log('complete')
    })
  }

}

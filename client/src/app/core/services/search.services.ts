import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchServices {

  private searchSubject = new BehaviorSubject<string>('');

  search$ = this.searchSubject.asObservable();

  setSearch(search: string): void {
    this.searchSubject.next(search);
  }

  clearSearch(): void {
    this.searchSubject.next('');
  }

}

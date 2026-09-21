import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { SearchServices } from '../../core/services/search.services';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [
    MatIcon,
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnDestroy {

  searchText = '';
  
  private searchService = inject(SearchServices);

  private searchSubject = new Subject<string>();

  private destroy$ = new Subject<void>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    )
      .subscribe(search => {
        this.searchService.setSearch(search)
      })
  }

  onSearch(): void {
    this.searchSubject.next(
      this.searchText.trim()
    );
  }

  clearSearch(): void {
    this.searchText = '';
    this.searchService.clearSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

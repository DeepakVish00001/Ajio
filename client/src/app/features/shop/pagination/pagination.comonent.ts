import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  imports: [
    MatIcon,
    MatPaginator
  ],
  templateUrl: './pagination.comonent.html',
  styleUrl: './pagination.comonent.css',
})
export class PaginationComonent {

  @Input() length = 0;
  @Input() pageSize = 5;
  @Input() pageIndex = 1;


  @Input() pageSizeOptions: number[] = [5, 10, 15, 20, 50, 100];

  @Output() pageChanged = new EventEmitter<number>();

  get totalPages(): number {
    return this.pageSize > 0
      ? Math.ceil(this.length / this.pageSize)
      : 0;
  }

  get pages(): number[] {
    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );
  }

  firstPage(): void {
    if (this.pageIndex > 0) {
      this.pageChanged.emit(0)
    }
  }

  previousPage(): void {
    if (this.pageIndex > 0) {
      this.pageChanged.emit(this.pageIndex - 1)
    }
  }

  nextPage(): void {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageChanged.emit(this.pageIndex + 1)
    }
  }

  lastPage(): void {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageChanged.emit(this.totalPages - 1);
    }
  }

  goToPage(page: number): void {
    this.pageChanged.emit(page - 1);
  }

  // handlePageEvent(event: PageEvent) {
  //   this.pageChanged.emit(event)
  // }


}

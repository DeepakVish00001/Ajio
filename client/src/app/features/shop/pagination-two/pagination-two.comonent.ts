import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination-two',
  imports: [
    MatPaginator
  ],
  templateUrl: './pagination-two.comonent.html',
  styleUrl: './pagination-two.comonent.css',
})
export class PaginationTwoComonent {

  @Input() length = 0;
  @Input() pageSize = 5;
  @Input() pageIndex = 0;

  @Input() pageSizeOptions: number[] = [5, 10, 15, 20, 50, 100];

  @Output() pageChanged = new EventEmitter<PageEvent>();

  handlePageEvent(event: PageEvent) {
    this.pageChanged.emit(event);
  }
}

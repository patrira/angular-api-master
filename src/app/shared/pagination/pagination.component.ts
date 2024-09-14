import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  visiblePages: number[] = [];
  totalPages: number = 0;

  ngOnChanges(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.updateVisiblePages();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
    this.updateVisiblePages();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  updateVisiblePages(): void {
    const visibleRange = 5;
    const startPage = Math.max(this.currentPage - Math.floor(visibleRange / 2), 1);
    const endPage = Math.min(startPage + visibleRange - 1, this.totalPages);
    this.visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
}

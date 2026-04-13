import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../../base/base-component';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'sh-pagination',
  standalone: true,
  imports: [FormsModule, MatIcon],
  providers: BaseComponent.baseProvider(PaginationNgComponent),
  templateUrl: './pagination-ng.component.html',
  styleUrl: './pagination-ng.component.css'
})
export class PaginationNgComponent extends BaseComponent implements OnChanges {

  @Input() rowCount: number = 0;
  @Input() rowSize: number = 10;
  @Input() sizes: number[] = [10, 20, 40];

  @Input() currentPage: number = 1;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>(); // ✅ emette 1-based
  @Output() sizeChange: EventEmitter<number> = new EventEmitter<number>();


  page: number = 1;

  pagesize: number = 10;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPage'] && typeof this.currentPage === 'number') {
      this.page = this.clampPage(this.currentPage);
    }

    if (changes['rowCount'] || changes['rowSize']) {
      this.page = this.clampPage(this.page);
    }
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.rowCount / this.rowSize));
  }

  get pages(): number[] {
    const n = this.totalPages;
    return Array.from({ length: n }, (_, i) => i + 1);
  }

  get visiblePages(): number[] {
    const totalPages = this.totalPages;

    if (totalPages <= 7) return this.pages;

    const currentPage = this.page;

    if (currentPage <= 3) return [1, 2, 3, 4, 5];

    if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  }

  goToPage(pageNum: number) {
    this.page = this.clampPage(pageNum);
    this.emitPage();
  }

  goToPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.emitPage();
    }
  }

  goToNextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.emitPage();
    }
  }

  private clampPage(p: number): number {
    if (!Number.isFinite(p)) return 1;
    return Math.min(Math.max(1, Math.trunc(p)), this.totalPages);
  }

  private emitPage() {
    this.pageChange.emit(this.page);
  }

  changeSize() {
    this.sizeChange.emit(this.pagesize);
  }
}

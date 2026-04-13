import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ContentChildren,
  QueryList,
  computed,
  AfterContentInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnDef, PageState, SortState, SortDirection } from './table-ng.types';
import { PaginationNgComponent } from '../pagination-ng/pagination-ng.component';
import { ShCellDefDirective } from './table-ng-cell-def.directive';
import { MatIcon } from '@angular/material/icon';
import { TranslateNgPipe } from '../../../pipes/translate-ng-pipe';

@Component({
  selector: 'sh-table',
  standalone: true,
  imports: [CommonModule, PaginationNgComponent, MatIcon, TranslateNgPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-ng.component.html',
  styleUrl: './table-ng.component.scss'
})
export class TableNgComponent<T> implements AfterContentInit {
  // ------------------
  // INPUTS
  // ------------------
  columns = input.required<ColumnDef<T>[]>();
  rows = input.required<T[]>();
  rowKey = input<(row: T) => string | number>();
  loading = input<boolean>(false);
  emptyText = input<string>('Nessun risultato');
  errorText = input<string>('');
  sort = input<SortState>();
  page = input<PageState>();
  clickable = input<boolean>(false);

  // ------------------
  // OUTPUTS
  // ------------------
  pageChange = output<number>();
  sortChange = output<SortState>();
  rowClick = output<T>();

  // ------------------
  // CONTENT CHILDREN
  // ------------------
  @ContentChildren(ShCellDefDirective) cellDefs!: QueryList<ShCellDefDirective<T>>;

  cellTemplates = computed(() => {
    const map = new Map<string, any>();
    this.cellDefs?.forEach(def => {
      map.set(def.key, def.template);
    });
    return map;
  });

  ngAfterContentInit() {}

  // ------------------
  // METHODS
  // ------------------
  trackRow = (_: number, row: T) => this.rowKey?.()?.(row);

  cellValue(row: T, col: ColumnDef<T>): unknown {
    if (col.value) return col.value(row);
    return (row as any)?.[col.key];
  }

  hasCellTemplate(key: string): boolean {
    return this.cellTemplates().has(key);
  }

  getCellTemplate(key: string) {
    return this.cellTemplates().get(key);
  }

  thClass(col: ColumnDef<T>): string {
    const classes: string[] = ['align-middle'];
    const align = col.align || 'start';
    classes.push(align === 'start' ? 'text-start' : align === 'end' ? 'text-end' : 'text-center');
    if (col.sortable) classes.push('sortable');
    return classes.join(' ');
  }

  tdClass(col: ColumnDef<T>): string {
    const classes: string[] = ['align-middle'];
    const align = col.align || 'start';
    classes.push(align === 'start' ? 'text-start' : align === 'end' ? 'text-end' : 'text-center');
    return classes.join(' ');
  }

  thContentClass(col: ColumnDef<T>): string {
    const classes: string[] = ['d-flex', 'align-items-center', 'gap-1'];
    const align = col.align || 'start';
    if (align === 'center') {
      classes.push('justify-content-center');
    } else if (align === 'end') {
      classes.push('justify-content-end');
    } else {
      classes.push('justify-content-start');
    }
    return classes.join(' ');
  }

  onSort(col: ColumnDef<T>) {
    if (!col.sortable) return;
    const currentSort = this.sort();
    let direction: SortDirection = 'asc';
    if (currentSort?.key === col.key) {
      direction = currentSort.direction === 'asc' ? 'desc' : currentSort.direction === 'desc' ? '' : 'asc';
    }
    this.sortChange.emit({ key: col.key, direction });
  }

  getSortIcon(col: ColumnDef<T>): string {
    const currentSort = this.sort();
    if (!col.sortable || !currentSort || currentSort.key !== col.key) {
      return 'unfold_more';
    }
    return currentSort.direction === 'asc' ? 'expand_less' : 'expand_more';
  }

  getSortAriaSort(col: ColumnDef<T>): string | null {
    const currentSort = this.sort();
    if (!col.sortable || !currentSort || currentSort.key !== col.key || !currentSort.direction) {
      return null;
    }
    return currentSort.direction === 'asc' ? 'ascending' : 'descending';
  }

  onRowClick(row: T) {
    if (this.clickable()) {
      this.rowClick.emit(row);
    }
  }

  getRowClass(): string {
    return this.clickable() ? 'clickable' : '';
  }
}

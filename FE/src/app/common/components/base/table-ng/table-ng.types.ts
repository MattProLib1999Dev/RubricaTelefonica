// export type SortDirection = 'asc' | 'desc' | '';

// export interface SortState {
//   key: string;
//   direction: SortDirection;
// }

// export interface PageState {
//   page: number;
//   pageSize: number;
//   total: number;
// }

// export interface ColumnDef<T> {
//   key: string;
//   header: string;
//   width?: string;
//   align?: 'left' | 'center' | 'right';
//   sortable?: boolean;
//   sticky?: 'left' | 'right';
//   hideBelow?: 'sm' | 'md' | 'lg';
//   value?: (row: T) => unknown;
//   ariaLabel?: string;
// }


/**
 * rowActionsTemplate?: TemplateRef<{ $implicit: T }>
 * cellTemplates?
 */


export type SortDirection = 'asc' | 'desc' | '';

export interface SortState {
  key: string;
  direction: SortDirection;
}

export interface PageState {
  page: number;      // 1-based
  pageSize: number;
  total: number;
}

export interface ColumnDef<T> {
  key: string;
  header: string;

  width?: string; // es: '180px', '10rem'
  align?: 'start' | 'center' | 'end';

  // per MVP: valore semplice (fallback)
  value?: (row: T) => unknown;

  // (per step successivo) sortable, sticky ecc.
  sortable?: boolean;
}


import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[shCellDef]',
  standalone: true
})
export class ShCellDefDirective<T> {
  @Input('shCellDef') key!: string;

  constructor(public template: TemplateRef<{ $implicit: T, row: T }>) {}
}

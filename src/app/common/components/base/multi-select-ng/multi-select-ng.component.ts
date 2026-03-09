import { AfterViewInit, Component, DestroyRef, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, inject, signal } from '@angular/core';
import { buttonDescription } from '../../../models/_index';
import { colors } from '../../../enums/_index';
import { CheckNgComponent, ValidationMessageComponent } from '../_index';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from '../base-component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'sh-multi-select',
  standalone: true,
  imports: [FormsModule, NgClass, CheckNgComponent, ValidationMessageComponent],
  templateUrl: './multi-select-ng.component.html',
  styleUrl: './multi-select-ng.component.scss',
  providers: BaseComponent.baseProvider(MultiSelectNgComponent)
})
export class MultiSelectNgComponent extends BaseComponent implements AfterViewInit {

  private destroyRef = inject(DestroyRef);

  _dataSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public data: any[] = [];

  private subscription!: Subscription;

  @Input()
  valuefield: string = "id";

  @Input()
  textfield: string = "text";

  @Input()
  emptyText: string = "";

  @Input()
  emptyValue: any = null;

  @Input()
  set dataSource(value: BehaviorSubject<any[]> | any[]) {
    if (value instanceof BehaviorSubject) {
      this._dataSource = value;
      if (this.subscription)
        this.subscription.unsubscribe();

      this.subscription = this._dataSource.subscribe(res => {
        this.data = res;
      });
    } else if (value instanceof Array) {
      this.data = value;
    }
  }

  @Input()
  disableCondition!: (value: any) => boolean;

  public get sizeClass() {
    if (this.size == "")
      return "";
    return "form-select-" + this.size;
  }

  checkDisabled(value: any) {
    if (this.disableCondition) {
      return this.disableCondition(value);
    }

    return false;
  }

  @Output()
  onselect: EventEmitter<any> = new EventEmitter<any>();

  buttons: buttonDescription[] = [];

  selected = signal(new Array<any>);

  sub: Subscription = null!;

  @Input()
  set selectCommand(value: BehaviorSubject<any>) {
    if (this.sub)
      this.sub.unsubscribe();
    this.sub = value.subscribe(res => {
      if (res[this.valuefield] > 0)
        this.selected.update(() => res);
      else
        this.selected.update(() => new Array<any>);
    });
  }

  resetSub: Subscription = null!;

  @Input()
  set resetCommand(value: BehaviorSubject<boolean>) {
    if (this.resetSub)
      this.resetSub.unsubscribe();

    this.resetSub = value.subscribe(x => {
      if(x) {
        this.selected.update(() => new Array<any>);
        this.data = [];
      }
    });

  }

  @ViewChild('multiSelRef') multiSelRef!: ElementRef;

  expanded: boolean = false;
  elemFocused: boolean = false;

  ngAfterViewInit(): void {

    if(!!this.formControl && !!this.formControl.value?.length) {

      this.data.filter(elem => this.formControl.value.some((formVal:any) => formVal == elem[this.valuefield])).forEach(elemSelected => {
        elemSelected.checked = true;
        this.select(elemSelected)
      });

    }
  }

  resetData() {
    this.data = [];
  }

  select(item: any) {
    if (item.checked) {
      this.selected.update(current => [...current, item]);
    } else {
      this.selected.update(current => current.filter(elem => elem[this.valuefield] !== item[this.valuefield]));
    }

    const selectedValues = this.selected().map(item => item[this.valuefield]);

    this.onChange(selectedValues.length > 0 ? selectedValues as any : null);

    this.onselect.emit(this.selected());

    return false;
  }

  remove(value: any) {
    this.value = '';
    if (!!value) {
      this.selected.update(current => current.filter(elem => elem[this.valuefield] !== value[this.valuefield]));
    }

    value.checked = false;

    const selectedValues = this.selected().map(item => item[this.valuefield]);

    this.onChange(selectedValues.length > 0 ? selectedValues as any : null);

    this.onselect.emit(this.selected());

  }

  public get colors() {
    return colors;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {

    if(!this.isDisabled() && this.elementContains(event.target)) {
      this.expanded = !this.expanded;
      this.elemFocused = true;
    } else {
      this.expanded = false;
      this.elemFocused = false;
    }
  }

  private elementContains(target: any) {
    return target.id?.indexOf('btnclose_' + this.uid) < 0 && !!(this.multiSelRef?.nativeElement?.parentElement as HTMLElement)
      ?.parentElement?.contains(target);
  }

}

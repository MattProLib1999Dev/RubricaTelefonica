import { Component, ElementRef, EventEmitter, Host, HostListener, Input, Optional, Output, SkipSelf, ViewChild, signal } from '@angular/core';
import { buttonDescription } from '../../../models/_index';
import { colors } from '../../../enums/_index';
import { CheckNgComponent, ValidationMessageComponent } from '../_index';
import { ControlContainer, FormsModule } from '@angular/forms';
import { BaseComponent } from '../base-component';
import { BehaviorSubject, Observable, Subject, Subscription, debounceTime } from 'rxjs';
import { NgClass } from '@angular/common';
import { TranslateNgPipe } from "../../../pipes/translate-ng-pipe";

@Component({
  selector: 'sh-multi-autocomplete',
  standalone: true,
  imports: [FormsModule, NgClass, CheckNgComponent, ValidationMessageComponent, TranslateNgPipe],
  templateUrl: './multi-autocomplete-ng.component.html',
  styleUrl: './multi-autocomplete-ng.component.scss',
  providers: BaseComponent.baseProvider(MultiAutocompleteNgComponent)
})
export class MultiAutocompleteNgComponent extends BaseComponent {

  @ViewChild('inputRefAutocomplete') inputRef!: ElementRef;

  dropdownOpen = false;

  constructor(@Optional() @Host() @SkipSelf()
  controlContainer: ControlContainer) {
    super(controlContainer)

    this.textSubject
      .pipe(debounceTime(this.debounceTime))
      .subscribe((value) => {

        if (!!this.dataFetcher) {
          this.loading = true;

          this.dataFetcher(this.text).subscribe({
            next: (res) => {
              if(!!this.text.length) {
                this.data = res;
                this.dropdownOpen = true;
                this.checkSelected();
              }
              this.loading = false;
            },
            error: () => {
              this.loading = false;
            }
          })
        }
      })

  }

  @Input()
  valuefield: string = "id";

  @Input()
  textfield: string = "text";

  @Input()
  dataFetcher!: (value: string) => Observable<any>;

  @Input()
  multiple: boolean = true;

  @Input()
  debounceTime: number = 300;

  @Input()
  charThreshold: number = 2;

  @Output()
  onselect: EventEmitter<any> = new EventEmitter<any>();

  buttons: buttonDescription[] = [];

  data: any[] = [];
  text: string = "";
  selected = signal(new Array<any>);

  sub: Subscription = null!;

  private textSubject = new Subject<string>();

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
        this.text = "";
        this.selected.update(() => new Array<any>);
        this.data = [];
        this.dropdownOpen = false;
      }
    });

    this.text = "";
  }

  loading: boolean = false;
  elemFocused: boolean = false;

  change(eventVal: string) {

    this.text = eventVal;

    if (eventVal?.length > this.charThreshold) {
      this.textSubject.next(eventVal);
    } else {
      this.data = [];
      this.dropdownOpen = false;
    }

  }

  resetData() {
    this.text = "";
    this.data = [];
    this.dropdownOpen = false;
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

  get lock(): boolean {
    return !this.multiple && !!this.selected();
  }

  remove(value: any) {
    this.value = '';
    if (!!value) {
      this.selected.update(current => current.filter(elem => elem[this.valuefield] !== value[this.valuefield]));
    }

    const selectedValues = this.selected().map(item => item[this.valuefield]);

    this.onChange(selectedValues.length > 0 ? selectedValues as any : null);

    this.onselect.emit(this.selected());

    return !this.multiple && !!this.selected();
  }

  public get sizeClass() {
    if (this.size == "")
      return "";
    return "form-select-" + this.size;
  }

  public get colors() {
    return colors;
  }

  checkSelected() {
    if (!!this.data?.length && !!this.selected()?.length) {

      this.data.forEach(item => {

        item.checked = !!this.selected().find(selElem => item[this.valuefield] === selElem[this.valuefield]);

      });

    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {

    this.dropdownOpen =  !this.isDisabled() && this.elementContains(event.target);
    this.elemFocused = this.dropdownOpen

  }

  private elementContains(target: any) {
    return target.id?.indexOf('btnclose_' + this.uid) < 0 && !!(this.inputRef?.nativeElement?.parentElement as HTMLElement)
      ?.parentElement?.contains(target);
  }
}

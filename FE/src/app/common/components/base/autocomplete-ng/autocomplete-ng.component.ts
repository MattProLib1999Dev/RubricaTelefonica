import { AfterViewInit, Component, ElementRef, EventEmitter, Host, HostListener, Input, Optional, Output, SkipSelf, ViewChild, forwardRef, signal } from '@angular/core';
import { buttonDescription } from '../../../models/_index';
import { colors } from '../../../enums/_index';
import { ValidationMessageComponent } from '../_index';
import { ControlContainer, ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseComponent } from '../base-component';
import { BehaviorSubject, Observable, Subject, Subscription, debounceTime } from 'rxjs';
import { NgClass } from '@angular/common';
import { TranslateNgPipe } from "../../../pipes/translate-ng-pipe";

@Component({
  selector: 'sh-autocomplete',
  standalone: true,
  imports: [FormsModule, NgClass, ValidationMessageComponent, TranslateNgPipe],
  templateUrl: './autocomplete-ng.component.html',
  styleUrl: './autocomplete-ng.component.scss',
  providers: [
    ...BaseComponent.baseProvider(forwardRef(() => AutocompleteNgComponent)),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteNgComponent),
      multi: true
    }
  ]
})
export class AutocompleteNgComponent extends BaseComponent implements AfterViewInit, ControlValueAccessor {

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

          this.dataFetcher(this.selected().text).subscribe({
            next: (res) => {
              if(!!this.selected().text.length) {
                this.data = res;
                this.dropdownOpen = true;
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
  multiple: boolean = false;

  @Input()
  debounceTime: number = 300;

  @Input()
  charThreshold: number = 2;

  @Input()
  initialValue: any = null;

  @Output()
  onselect: EventEmitter<any> = new EventEmitter<any>();

  buttons: buttonDescription[] = [];

  data: any[] = [];
  selected = signal({} as any);

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
        this.selected.update(() => {});
    });
  }

  resetSub: Subscription = null!;

  @Input()
  set resetCommand(value: BehaviorSubject<boolean>) {
    if (this.resetSub)
      this.resetSub.unsubscribe();

    this.resetSub = value.subscribe(x => {
      if(x) {
        this.selected.set({});
        this.data = [];
        this.dropdownOpen = false;
      }
    });

    this.selected.set({});
  }

  loading: boolean = false;
  elemFocused: boolean = false;

  ngAfterViewInit(): void {

    if(!!this.initialValue) {

      this.select(this.initialValue)

    }
  }

  change($event: KeyboardEvent) {

    const eventVal = ($event.target as any).value;

    this.selected().text = eventVal;

    if (eventVal?.length > this.charThreshold) {
      this.textSubject.next(eventVal);
    } else {
      this.data = [];
      this.dropdownOpen = false;
    }

  }

  resetData() {
    this.selected.set({});
    this.data = [];
    this.dropdownOpen = false;
  }

  select(item: any) {

    this.selected.set(item);

    const selectedValue = this.selected()[this.valuefield];

    this.onChange(selectedValue.length > 0 ? selectedValue as any : null);

    this.onselect.emit(this.selected());

    this.dropdownOpen = false;

    return false;
  }

  get lock(): boolean {
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

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {

    this.dropdownOpen =  !this.isDisabled() && this.elementContains(event.target);
    this.elemFocused = this.dropdownOpen

  }

  private elementContains(target: any) {
    return !!(this.inputRef?.nativeElement?.parentElement as HTMLElement)
      ?.contains(target);
  }
}

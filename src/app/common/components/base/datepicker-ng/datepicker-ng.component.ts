import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild, inject, signal } from '@angular/core';
import { BaseComponent } from '../base-component';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ValidationMessageComponent } from "../_index";
import { DatePipe, NgClass } from '@angular/common';
import { Subject, startWith, takeUntil } from 'rxjs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
  NgxMatCalendar,
  NgxMatDatepickerActions,
  NgxMatDatepickerApply,
  NgxMatDatepickerCancel,
  NgxMatDatepickerClear,
  NgxMatDatepickerInput,
  NgxMatDatetimepicker,
} from '@ngxmc/datetime-picker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'sh-datepicker',
  standalone: true,
  imports: [
    NgxMatDatepickerActions,
    NgxMatDatepickerActions,
    NgxMatDatepickerApply,
    NgxMatDatepickerCancel,
    NgxMatDatepickerClear,
    NgxMatDatepickerInput,
    NgxMatDatetimepicker,
    NgClass,
    MatIconModule,
    FormsModule,
    ValidationMessageComponent,
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  providers: [BaseComponent.baseProvider(DatePickerNgComponent), DatePipe],
  templateUrl: './datepicker-ng.component.html',
  styleUrl: './datepicker-ng.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerNgComponent extends BaseComponent implements OnInit {

  private destroyRef = inject(DestroyRef);

  readonly shPickerHeader = ShPickerHeader;

  datePipe: DatePipe = inject(DatePipe);
  breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  @ViewChild('shaDatepickerRef') shaDatepickerRef!: ElementRef;

  @Output()
  dayScrollEvent: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {

    this.placeholder = this.placeholder || "-- / -- / ----";

    this.breakpointObserver.observe(['(max-width: 920px)']).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.isTouch = result.matches;
      });
  }

  @Input()
  type: string = "";

  public get sizeClass() {
    if (this.size == "")
      return "";
    return "form-control-" + this.size;
  }

  hideTime: boolean = true;
  isTouch: boolean = false;

  @Input()
  readonlyPlain: boolean = false;

  @Input()
  customClass: string = "";

  @Input()
  set dateType(value: 'date' | 'datetime') {

    this.hideTime = value != 'datetime';

  }

  @Input()
  minDate?: Date | string;

  @Input()
  maxDate?: Date | string;

  checkTime() {
    if(this.hideTime && !!this.valueSign()) {
      this.value = this.stripTime(this.valueSign());
    }
  }

  stripTime(value: string | Date): string {

    if(value instanceof Date) {
      return this.datePipe.transform(new Date(value.getFullYear(), value.getMonth(), value.getDate()), 'yyyy-MM-dd')!;
    } else {
      return value.split(/[T ]/)[0];
    }

  }

  sumDuration(durationIncrement: number, timeUint: string) {

    let newDate = null;

    if(this.valueSign()?.length > 0) {

      const valueStr = this.stripTime(this.valueSign());

      newDate = new Date(valueStr);
    } else {
      newDate = new Date();
    }
    newDate.setDate(newDate.getDate() + durationIncrement);

    this.value = this.datePipe.transform(newDate, 'yyyy-MM-dd')!;

    if(!!this.dayScrollEvent) {
      this.dayScrollEvent.emit();
    }

  }

}

@Component({
  selector: 'sh-picker-header',
  styles: `
    .sh-picker-header {
      display: flex;
      align-items: center;
      padding: 0.5em;
    }

    .sh-picker-header-label {
      flex: 1;
      height: 1em;
      font-weight: 500;
      text-align: center;
    }
  `,
  template: `
    <div class="sh-picker-header">
      <button matIconButton (click)="previousClicked('year')">
        <mat-icon>keyboard_double_arrow_left</mat-icon>
      </button>
      <button matIconButton (click)="previousClicked('month')">
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <span class="sh-picker-header-label">{{periodLabel()}}</span>
      <button matIconButton (click)="nextClicked('month')">
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
      <button matIconButton (click)="nextClicked('year')">
        <mat-icon>keyboard_double_arrow_right</mat-icon>
      </button>
    </div>
  `,
  imports: [MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShPickerHeader<D> implements OnDestroy {
  private _calendar = inject<NgxMatCalendar<D>>(NgxMatCalendar);
  private _dateAdapter = inject<DateAdapter<D>>(DateAdapter);
  private _dateFormats = inject(MAT_DATE_FORMATS);

  private _destroyed = new Subject<void>();

  readonly periodLabel = signal('');

  constructor() {
    this._calendar.stateChanges.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
      this.periodLabel.set(
        this._dateAdapter
          .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
          .toLocaleUpperCase(),
      );
    });
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }
}

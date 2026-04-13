import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base-component';
import { FormsModule } from '@angular/forms';
import { ValidationMessageComponent } from "../_index";
import { NgClass } from '@angular/common';

@Component({
  selector: 'sh-timepicker',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    ValidationMessageComponent,
  ],
  providers: BaseComponent.baseProvider(TimePickerNgComponent),
  templateUrl: './timepicker-ng.component.html',
  styleUrl: './timepicker-ng.component.scss',
})
export class TimePickerNgComponent extends BaseComponent {

    @Input()
    readonlyPlain: boolean = false;

    @Input()
    datalist: string[] = [];

    public get sizeClass() {
      if (this.size == "")
        return "";
      return "form-control-" + this.size;
    }

    onInput(event: Event) {
      const input = event.target as HTMLInputElement;
      const digits = input.value.replace(/\D/g, '').slice(0, 4);

      let h = '';
      let m = '';

      if (digits.length >= 1) {
        const d1 = digits[0];
        h = ['0', '1', '2'].includes(d1) ? d1 : '0';
      }

      if (digits.length >= 2) {
        const d2 = digits[1];
        h =
          h[0] === '2'
            ? h[0] + Math.min(+d2, 3)
            : h[0] + d2;
      }

      if (digits.length >= 3) {
        const d3 = digits[2];
        m = +d3 > 5 ? '0' : d3;
      }

      if (digits.length >= 4) {
        m = m[0] + digits[3];
      }

      this.value =
        h.length === 2 ? `${h}:${m}` : h;

      if (this.value.length === 5) {
        this.onChange(this.value);
      } else {
        this.onChange("");
      }
    }

}

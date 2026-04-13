import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { textFieldInputs } from '../../../../models/_index';
import { TextboxNgComponent } from '../../_index';
import { BaseFieldComponent } from '../base-field/base-field.component';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, TextboxNgComponent],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.css'
})
export class TextFieldComponent extends BaseFieldComponent implements textFieldInputs {

  @Output()
  event: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  placeHolder: string = '';

  @Input()
  maxLength: number = 0;

  get text(): string {
    if (this.maxLength > 0 && this.data[this.boundField].length > this.maxLength) {
      return this.data[this.boundField].substring(0, this.maxLength) + "...";
    }
    return this.data[this.boundField];
  }
}



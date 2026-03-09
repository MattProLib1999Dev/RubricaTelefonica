import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectNgComponent } from '../../_index';
import { selectFieldInputs } from '../../../../models/columns/selectFieldColumn';
import { BaseFieldComponent } from '../base-field/base-field.component';

@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, SelectNgComponent],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.css'
})
export class SelectFieldComponent extends BaseFieldComponent implements selectFieldInputs {
  @Input()
  selectData: any[] = [];

  @Input()
  textField: string = '';

  @Input()
  valueField: string = '';

}

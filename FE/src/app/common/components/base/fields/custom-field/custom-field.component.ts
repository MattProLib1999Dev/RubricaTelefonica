import { Component, Input } from '@angular/core';
import { customFieldInputs } from '../../../../models/columns/customFieldColumn';
import { BaseFieldComponent } from '../base-field/base-field.component';

@Component({
  selector: 'app-custom-field',
  standalone: true,
  imports: [],
  templateUrl: './custom-field.component.html',
  styleUrl: './custom-field.component.css'
})
export class CustomFieldComponent extends BaseFieldComponent implements customFieldInputs {

  @Input()
  boundMethod: (data: any) => string = (data: any) => "";

}

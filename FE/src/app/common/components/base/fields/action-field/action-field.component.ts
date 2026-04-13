import { Component, Input } from '@angular/core';
import { actionInputs, buttonDescription } from '../../../../models/_index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseFieldComponent } from '../base-field/base-field.component';

@Component({
  selector: 'app-action-field',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './action-field.component.html',
  styleUrl: './action-field.component.css'
})
export class ActionFieldComponent extends BaseFieldComponent implements actionInputs {

  @Input()
  buttons: buttonDescription[] = [];

  @Input()
  rowBound: (data: any, states: buttonDescription[]) => void = (data: any, buttons: buttonDescription[]) => { };

  get validButtons(): buttonDescription[] {
    let s = JSON.stringify(this.buttons);
    let b: buttonDescription[] = JSON.parse(s);

    this.rowBound(this.data, b);

    return b;
  }

  onClick(commandName: string) {
    this.command.emit({
      commandName: commandName,
      data: this.data,
      index: this.index
    });
    return false;
  }
}

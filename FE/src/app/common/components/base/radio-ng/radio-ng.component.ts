import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base-component';
import { colors } from '../../../enums/colors';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'sh-radio',
  standalone: true,
  imports: [FormsModule, NgClass],
  providers: BaseComponent.baseProvider(RadioNgComponent),
  templateUrl: './radio-ng.component.html',
  styleUrl: './radio-ng.component.css'
})
export class RadioNgComponent extends BaseComponent {

  @Input()
  inlineStack: boolean = false;

  @Input()
  enableButton: boolean = false;

  @Input()
  name: string = "";

  @Input()
  radiovalue: any | string = null;

  @Input()
  outlineButton: boolean = false;

  @Input()
  buttonColor: colors | string = colors.primary;

  @Input()
  fullLength: boolean = false;

  @Input()
  customClass: string = "";

  get buttonClass(): string {
    if (!this.enableButton)
      return "";

    return "btn-" + (this.outlineButton ? 'outline-' : '') + this.buttonColor;
  }
}

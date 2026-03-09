import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base-component';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { colors } from '../../../_index';

@Component({
  selector: 'sh-checkbox',
  standalone: true,
  imports: [FormsModule, NgClass],
  providers: BaseComponent.baseProvider(CheckNgComponent),
  templateUrl: './check-ng.component.html',
  styleUrl: './check-ng.component.scss'
})
export class CheckNgComponent extends BaseComponent {

  @Input()
  enableSwitch: boolean = false;

  @Input()
  inlineStack: boolean = false;

  @Input()
  enableButton: boolean = false;

  @Input()
  outlineButton: boolean = false;

  @Input()
  fullLength: boolean = false;

  @Input()
  buttonColor: colors | string = colors.primary;

  get buttonClass(): string {
    if (!this.enableButton)
      return "";

    return "btn-" + (this.outlineButton ? 'outline-' : '') + this.buttonColor;
  }

}

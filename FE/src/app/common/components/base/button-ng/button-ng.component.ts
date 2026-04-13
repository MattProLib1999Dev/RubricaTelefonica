import { Component, EventEmitter, Input, Output } from '@angular/core';
import { buttonDescription, buttonSize, buttonState, buttonType, colors } from '../../../_index';
import { NgClass } from '@angular/common';
import { buttonIcon } from '../../../models/buttonIcon';
import { tooltipPlacement } from '../../../enums/tooltipPlacement';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button-ng',
  standalone: true,
  imports: [NgClass, MatIconModule],
  templateUrl: './button-ng.component.html',
  styleUrls: ['./button-ng.component.scss']
})
export class ButtonNgComponent {

  @Input()
  description!: buttonDescription;

  @Input()
  type: buttonType | string = buttonType.button;

 _size: buttonSize | string = buttonSize.small;

  @Input()
  set size(value: buttonSize | string) {
    if(!!value && typeof(value) === "string") {
      this._size = this.getColorFromKey(buttonSize, value);
    } else if(!!value) {
      this._size = value;
    }
  }

  get size() {
    return this._size;
  }

  @Input()
  customClass: string = "";

  @Input()
  title: string = "";

  @Input()
  preIcon: buttonIcon = {
    icon: "",
    customClass: "",
    ariaLablel: ""
  };

  @Input()
  postIcon: buttonIcon = {
    icon: "",
    customClass: "",
    ariaLablel: ""
  };

  @Input()
  commandName: string = "";

  @Input()
  formName: string = "";

  @Input()
  state: buttonState | string = buttonState.active;

  _color: string | colors = colors.primary;

  @Input()
  set color(value: colors | string) {
    if(!!value && typeof(value) === "string") {
      this._color = this.getColorFromKey(colors, value);
    } else if(!!value) {
      this._color = value;
    }
  }

  get color() {
    return this._color;
  }

  @Output()
  onclick: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  dismissModal: boolean = false;

  @Input()
  tooltipPlacement: tooltipPlacement | string = tooltipPlacement.top;

  @Input()
  tooltipValue: string = '';

  get pixelsize(): string {
    switch (this.size) {
      case buttonSize.large:
        return "32px";
      case buttonSize.normal:
        return "24px";
      case buttonSize.small:
        return "16px";
      default:
        return "";
    }
  }

  onClick(propagate: boolean = false) {
    this.onclick.emit(this.commandName);
    return propagate;
  }

  getColorFromKey(enumType: any, enumKey: string) {

    for (const key of Object.keys(enumType)) {
      if (key === enumKey) {
          return enumType[key];
      }
  }
  return undefined;

  }
}

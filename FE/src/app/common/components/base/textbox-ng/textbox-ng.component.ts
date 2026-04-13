import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from '../base-component';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { textboxType } from '../../../enums/textboxType';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';

@Component({
  selector: 'sh-textbox',
  standalone: true,
  imports: [FormsModule, NgClass, ValidationMessageComponent],
  providers: BaseComponent.baseProvider(TextboxNgComponent),
  templateUrl: './textbox-ng.component.html',
  styleUrl: './textbox-ng.component.css'
})
export class TextboxNgComponent extends BaseComponent {


  @Input()
  type: textboxType | string = textboxType.text;

  @Output()
  onKeyUp: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onEnter: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  readonlyPlain: boolean = false;

  @Input()
  datalist: string[] = [];

  public get sizeClass() {
    if (this.size == "")
      return "";
    return "form-control-" + this.size;
  }

  keyup($event: KeyboardEvent) {
    this.onKeyUp.emit(($event.target as any).value)
  }

  enter() {
    this.onEnter.emit();
  }
}

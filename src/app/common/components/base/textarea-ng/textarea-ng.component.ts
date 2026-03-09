import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from '../base-component';
import { NgClass } from '@angular/common';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sh-textarea',
  standalone: true,
  imports: [NgClass, ValidationMessageComponent, FormsModule],
  providers: BaseComponent.baseProvider(TextareaNgComponent),
  templateUrl: './textarea-ng.component.html',
  styleUrl: './textarea-ng.component.css'
})
export class TextareaNgComponent extends BaseComponent {

  @Input()
  readonlyPlain: boolean = false;

  @Input()
  datalist: string[] = [];

  @Input()
  rows: number = 5;

  @Input()
  cols: number | null = null;

  @Output()
  onKeyUp: EventEmitter<string> = new EventEmitter<string>();

  public get sizeClass() {
    if (this.size == "")
      return "";
    return "form-control-" + this.size;
  }

  keyup($event: KeyboardEvent) {
    this.onKeyUp.emit(($event.target as any).value)
  }
}

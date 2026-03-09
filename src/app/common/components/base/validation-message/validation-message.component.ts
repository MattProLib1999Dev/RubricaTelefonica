import { Component, Input } from '@angular/core';
import { TranslateNgPipe } from "../../../pipes/translate-ng-pipe";

@Component({
  selector: 'sh-validation-message',
  standalone: true,
  imports: [TranslateNgPipe],
  templateUrl: './validation-message.component.html',
  styleUrl: './validation-message.component.css'
})
export class ValidationMessageComponent {

  @Input()
  showValidators: boolean = true;

  @Input()
  errors: string[] = [];

  @Input()
  validatorToolTip: boolean = false;

}

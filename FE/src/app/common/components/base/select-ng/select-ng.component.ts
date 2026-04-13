import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base-component';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateNgPipe } from '../../../pipes/translate-ng-pipe';

@Component({
  selector: 'sh-select',
  standalone: true,
  imports: [NgClass, ValidationMessageComponent, FormsModule, ReactiveFormsModule, TranslateNgPipe],
  providers: BaseComponent.baseProvider(SelectNgComponent),
  templateUrl: './select-ng.component.html',
  styleUrl: './select-ng.component.scss'
})
export class SelectNgComponent extends BaseComponent {

  _dataSource: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  public data: any[] = [];

  private subscription!: Subscription;


  @Input()
  valuefield: string = "id";

  @Input()
  textfield: string = "text";

  @Input()
  emptyText: string = "";

  @Input()
  emptyValue: any = null;

  @Input()
  set dataSource(value: BehaviorSubject<any[]> | any[]) {
    if (value instanceof BehaviorSubject) {
      this._dataSource = value;
      if (this.subscription)
        this.subscription.unsubscribe();

      this.subscription = this._dataSource.subscribe(res => {
        this.data = res;
      });
    } else if (value instanceof Array) {
      this.data = value;
    }
  }

  @Input()
  disableCondition!: (value: any) => boolean;

  public get sizeClass() {
    if (this.size == "")
      return "";
    return "form-select-" + this.size;
  }

  checkDisabled(value: any) {
    if (this.disableCondition) {
      return this.disableCondition(value);
    }

    return false;
  }
}

import { Component, EventEmitter, Input } from '@angular/core';
import { baseInputs } from '../../../../models/columns/baseInputs';
import { rowArgs } from '../../../../models/rowArgs';
import { IdService } from '../../../../services/id.service';

@Component({
  selector: 'app-base-field',
  standalone: true,
  imports: [],
  template: ''
})
export class BaseFieldComponent implements baseInputs {

  private _uid: string = IdService.uuidv4();

  public get uid(): string {
    return "c_" + this._uid;
  }

  @Input()
  editing: boolean = false;

  @Input()
  boundField: string = "";

  @Input()
  data: any = {};

  @Input()
  index: number = 0;

  @Input()
  command: EventEmitter<rowArgs> = new EventEmitter<rowArgs>();
}



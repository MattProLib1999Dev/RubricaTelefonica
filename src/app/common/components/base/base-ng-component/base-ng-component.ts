import { Component, OnInit, Input, inject } from '@angular/core';
import { SizeType } from '../../../models/sizeType';
import { IdService } from '../../../services/id.service';

@Component({
  selector: 'base-ng',
  template: '',
})
export class BaseNgComponent implements OnInit {

  protected idService = inject(IdService);

  private _id: string = "";

  public get id() { return this._id; }

  @Input()
  size: SizeType|string = SizeType.normal;

  public sizeType = SizeType;

  ngOnInit(): void {
    this._id = this.idService.newUID();
  }

  public get service(): IdService {
    return this.idService;
  }

}

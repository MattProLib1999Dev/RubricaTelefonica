import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { IdService } from '../../../services/id.service';
import { BadgeColors } from '../../../enums/badegColors';

@Component({
  selector: 'sh-badge',
  standalone: true,
  imports: [NgClass],
  templateUrl: './badge-ng.component.html',
  styleUrl: './badge-ng.component.scss'
})
export class BadgeNgComponent {

  private _uid: string = IdService.uuidv4();

  public get uid(): string {
      return "c_" + this._uid;
  }

  @Input()
  squared: boolean = false;

  @Input()
  rounded: boolean = false;

  @Input()
  pill: boolean = false;

  @Input()
  inverted: boolean = false;

  @Input()
  width: string = "";

  @Input()
  height: string = "";

  @Input()
  customClass: string = "";

  @Input()
  color: BadgeColors | string = BadgeColors.primary;
}

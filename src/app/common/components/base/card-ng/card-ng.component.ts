import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { cardSize } from '../../../enums/cardSize';
import { NgClass } from '@angular/common';

@Component({
  selector: 'sh-card',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './card-ng.component.html',
  styleUrl: './card-ng.component.scss'
})
export class CardNgComponent {
  @Input()
  title: string = "";

  @Input()
  subtitle: string = "";

  @Input()
  text: string = "";

  @Input()
  count: number = 0;

  @Input()
  showCount: boolean = false;

  @Input()
  showButton: boolean = false;

  @Input()
  linkText: string = "";

  @Input()
  linkUrl: string = "";

  @Input()
  imagesrc: string = "";

  @Input()
  imagetext: string = "";

  @Input()
  imageheight: string = "";

  @Input()
  size: string | cardSize = cardSize.md;

  @Input()
  imgCard: boolean = false;

  @Input()
  disabled: boolean = false;

  @Input()
  customClass: string = "";
}

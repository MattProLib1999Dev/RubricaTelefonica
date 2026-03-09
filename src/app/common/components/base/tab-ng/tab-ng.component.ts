import { Component, EventEmitter, Input, Output } from '@angular/core';
import { tabDescription } from '../../../models/tabDescription';
import { NgClass } from '@angular/common';

@Component({
  selector: 'sh-tab',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tab-ng.component.html',
  styleUrl: './tab-ng.component.css'
})
export class TabNgComponent {

  @Output()
  onSelect: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  tabs: tabDescription[] = [];

  currentIndex: number = 0;

  @Input()
  set index(value: number) {
    this.currentIndex = value;
  }
}

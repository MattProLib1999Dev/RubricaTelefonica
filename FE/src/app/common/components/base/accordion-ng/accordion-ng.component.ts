import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'sh-accordion',
  standalone: true,
  imports: [NgClass],
  templateUrl: './accordion-ng.component.html',
  styleUrl: './accordion-ng.component.scss'
})
export class AccordionNgComponent extends BaseComponent {

  @Input()
  title: string = "";

  @Input()
  minimal: boolean = false;

  @Input()
  open: boolean = true;

  @Input()
  timeAccordion: boolean = false;

  @Input()
  customClass: string = "";

  @Input()
  btnCustomClass: string = "";

  @Input()
  status: 'HIDDEN' | 'IN_PROGRESS' | 'OK' = "HIDDEN";
}



// Angular
import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';

// Pipes
import { TranslateNgPipe } from '../../../pipes/translate-ng-pipe';

@Component({
  selector: 'sh-section-header',
  standalone: true,
  imports: [MatIcon, NgClass, TranslateNgPipe],
  templateUrl: './section-header-ng.component.html',
  styleUrl: './section-header-ng.component.scss'
})
export class SectionHeaderNgComponent {
  icon = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();
  customClass = input<string>();
}

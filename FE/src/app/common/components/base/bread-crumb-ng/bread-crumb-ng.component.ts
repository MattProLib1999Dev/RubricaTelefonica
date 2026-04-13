import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { breadCrumbDescription } from '../../../_index';

@Component({
  selector: 'sh-breadcrumb',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './bread-crumb-ng.component.html',
  styleUrl: './bread-crumb-ng.component.scss'
})
export class BreadCrumbNgComponent {
  @Input()
  breadCrumbs: breadCrumbDescription[] = [];
}

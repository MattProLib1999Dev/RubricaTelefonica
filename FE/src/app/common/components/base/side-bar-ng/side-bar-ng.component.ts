import { Component, Input, inject } from '@angular/core';
import { menuDescription } from '../../../models/_index';
import { BaseComponent } from '../../base/base-component';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'sh-sidebar',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './side-bar-ng.component.html',
  styleUrl: './side-bar-ng.component.css'
})
export class SideBarNgComponent extends BaseComponent {

  private router: Router = inject(Router);

  get currentUrl(): string {
    return this.router.url.substring(1);
  }

  @Input()
  menu: menuDescription[] = [];
}

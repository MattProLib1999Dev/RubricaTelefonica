import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith, distinctUntilChanged } from 'rxjs/operators';
import { LayoutMeta, LayoutVm } from './container-layout.types';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TranslateNgPipe } from '../../../pipes/translate-ng-pipe';


@Component({
  selector: 'app-container-layout',
  imports: [RouterOutlet, AsyncPipe, MatIcon, TranslateNgPipe],
  templateUrl: './container-layout.html',
  styleUrl: './container-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerLayout {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly vm$: Observable<LayoutVm> = this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    startWith(null),
    map(() => {
      const leaf = this.getLeafRoute(this.activatedRoute);

      const sectionData = (this.activatedRoute.snapshot.data ?? {}) as Data;
      const pageData = (leaf?.snapshot.data ?? {}) as Data;

      const sectionMeta: LayoutMeta = {
        title: sectionData['title'],
        icon: sectionData['icon'],
        description: sectionData['description'],
      };

      const pageMeta: LayoutMeta = {
        title: pageData['title'],
        icon: pageData['icon'],
        description: pageData['description'],
      };

      const vm: LayoutVm = {
        title: (pageMeta.title || sectionMeta.title || '').trim(),
        icon: pageMeta.icon || sectionMeta.icon,
        description: pageMeta.description || sectionMeta.description,
        pageTitle: pageMeta.title,
      };

      return vm;
    }),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
  );

  getLeafRoute(route: ActivatedRoute): ActivatedRoute | null {
    let current: ActivatedRoute | null = route.firstChild ?? null;
    while (current?.firstChild) {
      current = current.firstChild;
    }
    return current;
  }
}

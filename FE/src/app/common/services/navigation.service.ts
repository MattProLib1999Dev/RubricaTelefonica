import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  router: Router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);

  public navigate(url: string) {
    this.router.navigate([url]);
  }

  public getParams(): Observable<Params> {
    return this.route.queryParams;
  }

  public navigationEnd(): Observable<NavigationEnd> {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => event as NavigationEnd)
    );
  }

  
}

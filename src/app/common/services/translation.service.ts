import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  public labels$ = new BehaviorSubject<any>({});

  authService = inject(AuthService);

  constructor(private http: HttpClient) {

  }


  public init(lang?: string): Promise<any> {



    return new Promise<void>((resolve, reject) => {
      this.http.get(`./assets/i18n/${lang || this.authService.shLang}.json`).subscribe({next: ((res: any) => {
        this.labels$.next(res);
        resolve();
        }),
        error: (()=> {
          reject();
        })
      })
    });
  }


  public translate(tag: string): string {
    if (tag && tag.length > 0) {
      var res = this.labels$.value.filter((l: any) => l.tag == tag);
      if (res && res.length > 0)
        return res[0].etichetta;
    }

    return tag;
  }

  get labelsChanged$() {
    return this.labels$.asObservable();
  }
  
}

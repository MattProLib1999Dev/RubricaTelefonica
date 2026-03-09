import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { modalDescription } from '../models/_index';

@Injectable({
  providedIn: 'root'
})
export class BaseModalService {
  

  private _modal: BehaviorSubject<modalDescription> = new BehaviorSubject<modalDescription>({} as modalDescription);

  public get modal() {
    return this._modal;
  }

}

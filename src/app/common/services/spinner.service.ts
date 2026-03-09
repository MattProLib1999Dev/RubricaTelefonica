import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private _spinner: number = 0;

  public get spinner(): number {
    return this._spinner;
  }

  public set spinner(value: number) {
    this._spinner = value;
  }

  public incrementSpinner(): void {
    this._spinner++;
  }

  public decrementSpinner(): void {
    if(this._spinner > 0) {
      this._spinner--;
    }
  }

  public static noSpinner() {
    return { headers: { "sh_spinner": "0" } };
  }
  
}

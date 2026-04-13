import { Injectable } from '@angular/core';
import { OffcanvasNgComponent } from '../_index';

@Injectable({
  providedIn: 'root'
})
export class OffcanvasService {
  

  private _offcanvasList: OffcanvasNgComponent[] = [];

  public add(offcanvas: OffcanvasNgComponent) {

    if(!this._offcanvasList.some(elem => elem.uid == offcanvas.uid)) {
      this._offcanvasList.push(offcanvas);
    }

  }

  public delete(offcanvas: OffcanvasNgComponent) {

    const elemIndex = this._offcanvasList.indexOf(offcanvas);

    if (elemIndex > -1) {
      this._offcanvasList.splice(elemIndex, 1);
    }
  }

  public open(id: string) {

    const offcanvasElem = this._offcanvasList.find(elem => elem.uid == id);


    if(!!offcanvasElem) {

      this.toggleMain();
      
      this._offcanvasList.forEach(offcanvas => {
        if(offcanvas.uid != id && offcanvas.isOpen()) {
          offcanvas.close()
        }
      });
      
      offcanvasElem.open();
      
    }
  }

  public close(id: string) {

    const offcanvasElem = this._offcanvasList.find(elem => elem.uid == id && elem.isOpen());
    
    if(!!offcanvasElem) {
      this.toggleMain();
      offcanvasElem.close();
    }
  }

  toggleMain() {
    if(document.getElementById("main_sidebar")?.classList?.contains("show")) {
      document.getElementById("main_sidebar")?.classList?.remove("show")
      document.getElementById("main_sidebar")?.classList?.add("sidebar-min")
      document.getElementById("main_sidebar_hidebutton")?.click();
    }
  }
}

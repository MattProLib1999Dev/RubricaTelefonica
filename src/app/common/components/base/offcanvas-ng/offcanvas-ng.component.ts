import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { componentPosition } from '../../../enums/componentPosition';
import { NgClass, NgStyle } from '@angular/common';
import { IdService } from '../../../services/id.service';
import { TranslateNgPipe } from "../../../pipes/translate-ng-pipe";
import { OffcanvasService } from '../../../services/offcanvas.service';

@Component({
  selector: 'sh-offset',
  standalone: true,
  imports: [NgClass, NgStyle, TranslateNgPipe],
  templateUrl: './offcanvas-ng.component.html',
  styleUrl: './offcanvas-ng.component.css'
})
export class OffcanvasNgComponent {
  private _uid: string = IdService.uuidv4();

  public get uid(): string {
    return "c_" + this._uid;
  }

  @ViewChild('offcanvasRef') offcanvasRef!: ElementRef;

  offcanvasService: OffcanvasService = inject(OffcanvasService);

  constructor() {
    this.offcanvasService.add(this);
  }

  @Input()
  static: boolean = false;

  @Input()
  title: string = "";

  @Input()
  size: number = 0;

  @Input()
  measureType: 'px' | "%" = 'px';

  @Input()
  customClass: string = '';

  isOpen = signal(false);

  @Input()
  position: componentPosition | string = componentPosition.left;

  @Output()
  onclose: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  @Input()
  set command(value: BehaviorSubject<boolean>) {
    value.subscribe(res => {
      if (res) {
        this.offcanvasService.open(this.uid);
      } else {
        this.offcanvasService.close(this.uid);
      }
    });
  }

  get positionAttribute(): string {
    switch (this.position) {
      case componentPosition.left:
        return "offcanvas-start";
      case componentPosition.right:
        return "offcanvas-end";
      case componentPosition.top:
        return "offcanvas-top";
      case componentPosition.botton:
        return "offcanvas-bottom";
    }
    return "";
  }

  open() {
    if(!this.isOpen() && !this.checkElemOpen()) {
      document.getElementById(this.uid + '_showbutton')?.click();
      this.isOpen.set(true);
    }
  }

  close() {
    if(this.isOpen() && this.checkElemOpen()) {
      document.getElementById(this.uid + '_hidebutton')?.click();
      this.isOpen.set(false);
    }
  }

  checkElemOpen() {
    return this.offcanvasRef?.nativeElement.classList?.contains("show");
  }
}

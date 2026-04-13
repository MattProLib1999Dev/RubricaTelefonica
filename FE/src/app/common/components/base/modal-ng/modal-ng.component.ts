import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { modalSize } from '../../../enums/modalSize';
import { NgClass } from '@angular/common';
import { IdService } from '../../../services/id.service';
import { TranslateNgPipe } from "../../../pipes/translate-ng-pipe";
import { BsMaterialFocusBridgeDirective } from '../../../directives/bs-material-focus-bridge-directive';

@Component({
  selector: 'sh-modal',
  standalone: true,
  imports: [NgClass, TranslateNgPipe, BsMaterialFocusBridgeDirective],
  templateUrl: './modal-ng.component.html',
  styleUrl: './modal-ng.component.css'
})
export class ModalNgComponent implements AfterViewInit {

  private _uid: string = IdService.uuidv4();

  public get uid(): string {
    return "c_" + this._uid;
  }

  ngAfterViewInit(): void {
  this.viewInit = true;

  const el = document.getElementById(this.uid);
  el?.addEventListener('shown.bs.modal', () => {
    this.isOpen = true;
  });

  el?.addEventListener('hidden.bs.modal', () => {
    this.isOpen = false;
  });
}

  @Input()
  title: string = "";

  @Input()
  subtitle: string = "";

  @Input()
  submitText: string = "";

  @Input()
  formName: string = "";

  @Input()
  submitEnable: boolean = true;

  @Input()
  size: modalSize | string = modalSize.n;

  @Input()
  closeText: string = "";

  @Input()
  static: boolean = false;

  @Input()
  fullscreen: boolean = false;

  @Output()
  callbackFn: EventEmitter<any> = new EventEmitter<any>();

  isOpen: boolean = false;

  viewInit: boolean = false;

  @Input()
  set command(value: BehaviorSubject<boolean>) {
    value.subscribe(res => {
      if (this.viewInit && res && !this.isOpen) {

        document.getElementById(this.uid + '_showbutton')?.click();

        this.isOpen = true;

      } else if(!res && this.isOpen) {
        document.getElementById(this.uid + '_hidebutton')?.click();
        this.isOpen = false;
      }
    });
  }

  get sizeclass(): string {
    return 'modal-' + this.size;
  }

  confirm() {
    this.callbackFn.emit();
  }
}

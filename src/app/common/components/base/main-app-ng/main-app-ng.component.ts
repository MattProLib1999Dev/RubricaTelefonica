import { Component } from '@angular/core';
import { ModalNgComponent } from "../modal-ng/modal-ng.component";
import { ButtonNgComponent } from '../_index';
import { modalType } from '../../../models/_index';
import { BehaviorSubject } from 'rxjs';
import { NgClass } from '@angular/common';
import { SpinnerService } from '../../../services/spinner.service';
import { BaseModalService } from '../../../services/base-modal.service';
import { TranslateNgPipe } from "../../../pipes/translate-ng-pipe";

@Component({
  selector: 'sh-main',
  standalone: true,
  imports: [ModalNgComponent, ButtonNgComponent, NgClass, TranslateNgPipe],
  templateUrl: './main-app-ng.component.html',
  styleUrl: './main-app-ng.component.scss',
})
export class MainAppNgComponent {

  title: string = "";
  subtitle?: string = "";
  text: string = "";
  type: modalType = modalType.message;
  submitText?: string = "";
  closeText?: string = "";
  modal: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  method: (res: boolean) => void = (res: boolean) => { };
  callbackFn: (args?: any[]) => any = (args?: any[]) => {};

  constructor(private modalServ: BaseModalService, private spinnerService: SpinnerService) {
    modalServ.modal.subscribe(res => {
      if(res?.title || res?.text) {

        this.title = res.title;
        this.text = res.text;

        // if (res.subtitle)
          this.subtitle = res.subtitle;
        // if (res.submitText)
          this.submitText = res.submitText;
        // if (res.closeText)
          this.closeText = res.closeText;

        this.type = res.type;
        this.modal.next(true);
        this.method = res.command;
        if(!!res.callbackFn)
          this.callbackFn = res.callbackFn;
      }
    });
  }

  confirm() {
    this.method(true);
    this.callbackFn();
  }

  get isSpinning(): boolean {
    return this.spinnerService.spinner > 0;
  }
}

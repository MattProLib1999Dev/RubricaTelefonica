import { Injectable, EventEmitter } from '@angular/core';
import { DialogType, MessageResponse, ResponseType } from '../models/messageDialog';
import { MessageDialog } from '../models/messageDialog';
import { BehaviorSubject, Observable, skip } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messageEmitter: EventEmitter<MessageDialog> = new EventEmitter<MessageDialog>();

  public nodeEmitter: EventEmitter<MessageDialog> = new EventEmitter<MessageDialog>();

  public showMessage(title: string, message: string, type: DialogType = DialogType.message): Observable<ResponseType> {
    //behavior

    var b = new BehaviorSubject<ResponseType>(ResponseType.ok);
    var fun = (response: ResponseType) => { b.next(response); b.complete(); }
    this.messageEmitter.emit({ type: type, title: title, text: message, callback: fun });
    return b.pipe(skip(1));
  }

  public showConfirm(title: string, message: string): Observable<ResponseType> {
    //behavior

    var b = new BehaviorSubject<ResponseType>(ResponseType.ok);
    var fun = (response: ResponseType) => { b.next(response); b.complete(); }
    this.messageEmitter.emit({ type: DialogType.confirm, title: title, text: message, callback: fun });
    return b.pipe(skip(1));
  }

  public showQuestion(title: string, message: string, multiline: boolean = true): Observable<MessageResponse> {
    //behavior

    var b = new BehaviorSubject<MessageResponse>({ note: "", response: ResponseType.ok });
    var fun = (response: ResponseType, note: string | undefined) => {
      b.next({ response: response, note: note ? note : "" });
      b.complete();
    }
    if (multiline)
      this.messageEmitter.emit({ type: DialogType.note, title: title, text: message, callback: fun });
    else
      this.messageEmitter.emit({ type: DialogType.text, title: title, text: message, callback: fun });
    return b.pipe(skip(1));
  }



  public showNote(title: string, text: string) {
    var fun = (response: ResponseType, note: string | undefined) => {

    }
    this.nodeEmitter.emit({ title: title, text: text, type: DialogType.message, callback: fun });
  }

  
}

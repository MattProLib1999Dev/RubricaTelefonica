export enum ResponseType {
    ok = "ok",
    yes = "yes",
    no = "no",
    cancel = "cancel"
  }
  
  export enum DialogType {
    message = "message",
    confirm = "confirm",
    note = "note",
    text = "text"
  }
  
  export class MessageDialog {
    title: string = "";
    text: string = "";
    type: DialogType = DialogType.message;
    callback: (response: ResponseType, note: string | undefined) => void = (res => { });
  }
  
  export class MessageResponse {
    response: ResponseType = ResponseType.ok;
    note: string = "";
  }
  
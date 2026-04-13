import { Component, EventEmitter, Input } from '@angular/core';
import { BaseComponent } from '../base-component';
import { ValidationMessageComponent } from '../validation-message/validation-message.component';
import { FormsModule } from '@angular/forms';
import { fileData } from '../../../models/_index';

@Component({
  selector: 'sh-file',
  standalone: true,
  imports: [FormsModule, ValidationMessageComponent],
  providers: BaseComponent.baseProvider(FileNgComponent),
  templateUrl: './file-ng.component.html',
  styleUrl: './file-ng.component.css'
})
export class FileNgComponent extends BaseComponent {

  percentLoaded: number = 0;

  @Input()
  multiple: boolean = false;

  @Input()
  showPanel: boolean = true;

  filename: string = "";
  filesize: number = 0;
  filemode: number = 0;

  fileload: EventEmitter<fileData> = new EventEmitter<fileData>();

  error: EventEmitter<fileData> = new EventEmitter<fileData>();

  upload($event: any) {
    var files = $event.target.files;

    for (var i = 0, f; f = files[i]; i++) {
      this.filename = f.name;
      this.filesize = f.size;
      this.percentLoaded = 0;
      this.filemode = 0;
      var reader = new FileReader();

      reader.onprogress = (evt) => {
        if (evt.lengthComputable) {
          this.percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        }
      };

      reader.onerror = (evt) => {
        this.filemode = 2;
        this.error.emit({
          filename: this.filename,
          size: this.filesize
        });
      };

      reader.onload = (e) => {

        this.value = e.target?.result?.toString() ?? "";
        this.filemode = 1;
        this.percentLoaded = 100;

        this.fileload.emit({
          filename: this.filename,
          size: this.filesize
        });
      };

      this.filemode = 3;
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  getsize(): string {
    if (this.filesize > 1073741824) {
      return (this.filesize / 1073741824).toFixed(2) + " GB";
    }
    if (this.filesize > 1048576) {
      return (this.filesize / 1048576).toFixed(2) + " MB";
    }
    if (this.filesize > 1024) {
      return (this.filesize / 1024).toFixed(2) + " KB";
    }

    return this.filesize + " Byte";
  }

  download() {
    var a = document.createElement("a");
    a.href = this.value;
    a.download = this.filename;
    a.click();
  }
}

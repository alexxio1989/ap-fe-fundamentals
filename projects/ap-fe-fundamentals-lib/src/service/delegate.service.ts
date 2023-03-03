import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DelegateService {

  sbjSpinner = new Subject<boolean>();
  sbjErrorsNotification = new Subject<string>();
  public isMobile = false

  constructor(private deviceService: DeviceDetectorService) { 
    this.isMobile = this.deviceService.isMobile();
  }

  public editorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

}

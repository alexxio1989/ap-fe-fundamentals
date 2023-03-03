import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DelegateService } from 'ap-fe-fundamentals-lib';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  @Input() text:string;
  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() placeholder: string

  editorConfig: AngularEditorConfig ;

  constructor(public ds: DelegateService) { }

  ngOnInit(): void {
    this.editorConfig = this.ds.editorConfig;
    if(this.placeholder){
      this.editorConfig.placeholder = this.placeholder;
    }
  }

}

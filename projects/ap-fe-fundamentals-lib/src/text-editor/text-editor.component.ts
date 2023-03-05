import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DelegateService } from '../service/delegate.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  @Input() text:string;
  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() title: string
  @Input() placeholder: string

  editorConfig: AngularEditorConfig ;

  constructor(public ds: DelegateService) { }

  ngOnInit(): void {
    this.editorConfig = this.ds.editorConfig;
    if(this.placeholder){
      this.editorConfig.placeholder = this.placeholder;
    }
  }

  onChange(text:string){
    this.textChange.emit(text)
  }

}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImagesEditorComponent } from '../images-editor/images-editor.component';


@NgModule({
  declarations: [
    ImagesEditorComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule
  ],
  exports: [
    ImagesEditorComponent
  ]
})
export class ApFeFundamentalsLibModule { }

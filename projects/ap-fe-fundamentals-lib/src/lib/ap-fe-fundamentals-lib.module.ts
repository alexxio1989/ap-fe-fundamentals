import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImagesEditorComponent } from '../images-editor/images-editor.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TextEditorComponent } from '../text-editor/text-editor.component';

@NgModule({
  declarations: [
    ImagesEditorComponent,
    TextEditorComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    ImageCropperModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    AngularEditorModule
  ],
  exports: [
    ImagesEditorComponent,
    TextEditorComponent
  ]
})
export class ApFeFundamentalsLibModule { }

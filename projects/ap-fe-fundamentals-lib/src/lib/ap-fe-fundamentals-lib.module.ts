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
import { CardServizioComponent } from '../card-servizio/card-servizio.component';
import { IncrementerComponent } from '../incrementer/incrementer.component';
import { DialogDetailProdottoComponent } from '../card-servizio/dialog-detail-prodotto/dialog-detail-prodotto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaypalButtonComponent } from '../paypal-button/paypal-button.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { CartComponent } from '../cart/cart.component';
import {MatBadgeModule} from '@angular/material/badge';
import { DialogDetailEventoComponent } from '../card-servizio/dialog-detail-evento/dialog-detail-evento.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CalendarComponent } from '../calendar/calendar.component';


@NgModule({
  declarations: [
    ImagesEditorComponent,
    TextEditorComponent,
    CardServizioComponent,
    IncrementerComponent,
    DialogDetailProdottoComponent,
    DialogDetailEventoComponent,
    PaypalButtonComponent,
    CartComponent,
    CalendarComponent
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
    AngularEditorModule,
    BrowserAnimationsModule,
    NgxPayPalModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule
  ],
  exports: [
    ImagesEditorComponent,
    TextEditorComponent,
    CardServizioComponent,
    IncrementerComponent,
    DialogDetailProdottoComponent,
    PaypalButtonComponent,
    CartComponent
  ]
})
export class ApFeFundamentalsLibModule { }

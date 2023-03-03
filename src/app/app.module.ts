import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApFeFundamentalsLibModule } from 'projects/ap-fe-fundamentals-lib/src/public-api';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApFeFundamentalsLibModule
  ],
  providers: [{provide: 'environment', useValue: environment}],
  bootstrap: [AppComponent]
})
export class AppModule { }

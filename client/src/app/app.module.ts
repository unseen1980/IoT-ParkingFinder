import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToolbarModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';

const GOOGLE_API_KEY = 'AIzaSyDZ4xnS2btoA81ycONN7ZPXHGI8Y_jMZ0o';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MdToolbarModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_API_KEY
    })
  ],
  providers: [],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
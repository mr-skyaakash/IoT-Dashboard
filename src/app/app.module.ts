import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { GestureConfig } from '@angular/material';
import { AppComponent } from './app.component';
import { AppRouting } from './app-routing.module';
import { ComponentModule } from './component.module';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ComponentModule,
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled : environment.production })
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

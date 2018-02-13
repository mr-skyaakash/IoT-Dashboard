import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { AppRouting } from './app-routing.module';
import { ComponentModule } from './component.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ComponentModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

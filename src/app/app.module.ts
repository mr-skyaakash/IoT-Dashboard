import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';
import { Material } from './material.module';
import { AppRouting } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardsComponent } from './components/main/cards/cards.component';
import { ChartModule } from 'angular-highcharts';
import { DialogComponent } from './components/main/cards/dialog.component';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';
import { MqttService } from './services/mqtt.service';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthService } from './services/auth/auth.service';
import { ConnectService } from './services/devices/connect.service';
import { AddDeviceComponent } from './components/main/cards/add-device.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    CardsComponent,
    DialogComponent,
    LoginComponent,
    SignupComponent,
    AddDeviceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Material,
    AppRouting,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ChartModule
  ],
  providers: [
    WebsocketService,
    ChatService,
    MqttService,
    AuthService,
    ConnectService
  ],
  entryComponents: [
    DialogComponent,
    AddDeviceComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

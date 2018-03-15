import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddDeviceService } from './services/devices/admin/add-device.service';
import { AuthService } from './services/auth/auth.service';
import { MqttService } from './services/mqtt.service';
import { ConnectService } from './services/devices/connect.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouting } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { DeviceService } from './services/socket-server/device.service';
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { PushService } from './services/push-notify/push.service';
import { MomentModule } from 'angular2-moment';
import 'hammerjs';
import { AuthModule } from './components/auth/auth.module';
import { MainModule } from './components/main/main.module';
import { NavigationModule } from './components/navigation/navigation.module';
import { NotFoundModule } from './components/notFound/not-found.module';
import { SidenavMainService } from './services/sidenav-main/sidenav-main.service';
import { CapitalizePipe } from './_pipes/capitalize.pipe';
import { ControlService } from './services/devices/control.service';
import { MonitorService } from './services/devices/monitor.service';
import { SliderService } from './services/devices/slider.service';

firebase.initializeApp(environment.firebase);

@NgModule({
    imports: [
        AuthModule,
        MainModule,
        NavigationModule,
        NotFoundModule,
        CommonModule,
        Material,
        FlexLayoutModule,
        BrowserAnimationsModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase),
        MomentModule
            ],
    declarations: [
        // CapitalizePipe
        ],
    exports: [
        AuthModule,
        MainModule,
        NavigationModule,
        NotFoundModule,
        Material,
        FlexLayoutModule,
        BrowserAnimationsModule,
        AngularFireDatabaseModule,
        AngularFireModule,
        MomentModule,
        // CapitalizePipe
        ],
    entryComponents: [],
    providers: [
        AddDeviceService,
        AuthService,
        MqttService,
        ConnectService,
        DeviceService,
        PushService,
        SidenavMainService,
        ControlService,
        MonitorService,
        SliderService,
        ]
})
export class ComponentModule {}

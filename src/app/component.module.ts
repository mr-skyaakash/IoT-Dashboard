import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';
import { CardsComponent } from './components/main/cards/cards.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AddDeviceComponent } from './components/main/cards/settings/add-device.component';
import { TabsComponent } from './components/main/tabs/tabs.component';
import { DevicesComponent } from './components/main/cards/devices/devices.component';
import { DataComponent } from './components/main/cards/data/data.component';
import { AdminComponent } from './components/main/cards/admin/admin.component';
import { NgModule } from '@angular/core';
import { DialogComponent } from './components/main/cards/data/dialog.component';
import { CommonModule } from '@angular/common';
import { Material } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartModule } from 'angular2-highcharts';
import { SettingsComponent } from './components/main/cards/settings/settings.component';
import { AddDeviceService } from './services/devices/add-device.service';
import { AuthService } from './services/auth/auth.service';
import { MqttService } from './services/mqtt.service';
import { ConnectService } from './services/devices/connect.service';
import { ModifyDeviceComponent } from './components/main/cards/settings/modify-device.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouting } from './app-routing.module';
import { ErrorComponent } from './components/notFound/error/error.component';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { HttpModule } from '@angular/http';
import { DeviceService } from './services/socket-server/device.service';
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MessagingService } from './services/push-notify/messaging.service';
import { PushService } from './services/push-notify/push.service';
import { ClientRoleService } from './services/auth/client-role.service';
import { MomentModule } from 'angular2-moment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClientInterceptor } from './services/auth/client.interceptor';
export function highchartsFactory() {
  return require('highcharts');
}

firebase.initializeApp(environment.firebase);

@NgModule({
    imports: [CommonModule,
                Material,
                FormsModule,
                ReactiveFormsModule,
                FlexLayoutModule,
                ChartModule,
                BrowserAnimationsModule,
                AppRouting,
                HttpModule,
                AngularFireDatabaseModule,
                AngularFireModule.initializeApp(environment.firebase),
                MomentModule
            ],
    declarations: [HeaderComponent,
            SidenavComponent,
            CardsComponent,
            LoginComponent,
            SignupComponent,
            AddDeviceComponent,
            TabsComponent,
            DevicesComponent,
            DataComponent,
            AdminComponent,
            DialogComponent,
            ModifyDeviceComponent,
            SettingsComponent,
            ErrorComponent,
        ],
    exports: [HeaderComponent,
            SidenavComponent,
            CardsComponent,
            LoginComponent,
            SignupComponent,
            AddDeviceComponent,
            TabsComponent,
            DialogComponent,
            ModifyDeviceComponent,
            DevicesComponent,
            DataComponent,
            AdminComponent,
            SettingsComponent,
            Material,
            FormsModule,
            ReactiveFormsModule,
            FlexLayoutModule,
            ChartModule,
            BrowserAnimationsModule,
            AppRouting,
            ErrorComponent,
            HttpModule,
            AngularFireDatabaseModule,
            AngularFireModule,
            MomentModule
        ],
    entryComponents: [
                DialogComponent,
                ModifyDeviceComponent,
                AddDeviceComponent
    ],
    providers: [
            AddDeviceService,
            AuthService,
            MqttService,
            ConnectService,
            {
                provide: HighchartsStatic,
                useFactory: highchartsFactory,
            },
            {
                provide: HTTP_INTERCEPTORS,
                useClass: ClientInterceptor,
                multi: true
            },
            DeviceService,
            MessagingService,
            PushService,
            ClientRoleService
        ]
})
export class ComponentModule {}

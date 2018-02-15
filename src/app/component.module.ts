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
export function highchartsFactory() {
  return require('highcharts');
}

@NgModule({
    imports: [CommonModule,
                Material,
                FormsModule,
                ReactiveFormsModule,
                FlexLayoutModule,
                ChartModule,
                BrowserAnimationsModule,
                AppRouting,
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
                ErrorComponent
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
                useFactory: highchartsFactory
            },
        ]
})
export class ComponentModule {}

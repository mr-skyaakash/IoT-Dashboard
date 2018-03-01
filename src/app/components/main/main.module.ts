import { NgModule } from '@angular/core';
import { TabsComponent } from './tabs/tabs.component';
import { CardsComponent } from './cards/cards.component';
import { DevicesComponent } from './cards/devices/devices.component';
import { AddDeviceComponent } from './cards/settings/add-device.component';
import { ModifyDeviceComponent } from './cards/settings/modify-device.component';
import { DataComponent } from './cards/data/data.component';
import { DialogComponent } from './cards/data/dialog.component';
import { AdminComponent } from './cards/admin/admin.component';
import { SettingsComponent } from './cards/settings/settings.component';
import { CommonModule } from '@angular/common';
import { Material } from '../../material.module';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { AppRouting } from '../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';


export function highchartsFactory() {
    return require('highcharts');
  }

@NgModule({
    imports: [
        CommonModule,
        Material,
        ChartModule,
        AppRouting,
        HttpClientModule,
        FlexLayoutModule
    ],
    declarations: [
        TabsComponent,
        CardsComponent,
        AdminComponent,
        DataComponent,
        DevicesComponent,
        SettingsComponent,
        DialogComponent,
        AddDeviceComponent,
        ModifyDeviceComponent
    ],
    entryComponents: [
        DialogComponent,
        AddDeviceComponent,
        ModifyDeviceComponent
    ]
    ,
    exports: [
        TabsComponent,
        CardsComponent,
        AdminComponent,
        DataComponent,
        DevicesComponent,
        SettingsComponent,
        DialogComponent,
        AddDeviceComponent,
        ModifyDeviceComponent,
        AppRouting,
        HttpClientModule,
    ],
    providers: [
        {
            provide: HighchartsStatic,
            useFactory: highchartsFactory,
        }
    ]
})
export class MainModule {}

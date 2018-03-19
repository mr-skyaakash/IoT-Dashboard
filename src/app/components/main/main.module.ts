import { NgModule, Pipe } from '@angular/core';
import { TabsComponent } from './tabs/tabs.component';
import { CardsComponent } from './cards/cards.component';
import { DevicesComponent } from './cards/devices/devices.component';
import { AddDeviceComponent } from './cards/settings/add-device.component';
import { ModifyDeviceComponent } from './cards/settings/modify-device.component';
import { DataComponent } from './cards/data/data.component';
import { SliderComponent } from './cards/slider/slider.component';
import { SettingsComponent } from './cards/settings/settings.component';
import { CommonModule } from '@angular/common';
import { Material } from '../../material.module';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { AppRouting } from '../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipeModule } from '../../_pipes/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
        FlexLayoutModule,
        PipeModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        TabsComponent,
        CardsComponent,
        SliderComponent,
        DataComponent,
        DevicesComponent,
        SettingsComponent,
        AddDeviceComponent,
        ModifyDeviceComponent,
        
    ],
    entryComponents: [
        AddDeviceComponent,
        ModifyDeviceComponent
    ]
    ,
    exports: [
        TabsComponent,
        CardsComponent,
        SliderComponent,
        DataComponent,
        DevicesComponent,
        SettingsComponent,
        AddDeviceComponent,
        ModifyDeviceComponent,
        AppRouting,
        HttpClientModule,
        PipeModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        {
            provide: HighchartsStatic,
            useFactory: highchartsFactory,
        }
    ]
})
export class MainModule {}

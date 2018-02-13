import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';
import { CardsComponent } from './components/main/cards/cards.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AddDeviceComponent } from './components/main/cards/devices/add-device.component';
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
import { ChartModule } from 'angular-highcharts';

@NgModule({
    imports: [CommonModule,
                Material,
                FormsModule,
                ReactiveFormsModule,
                FlexLayoutModule,
                ChartModule
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
            DialogComponent],
    exports: [HeaderComponent,
            SidenavComponent,
            CardsComponent,
            LoginComponent,
            SignupComponent,
            AddDeviceComponent,
            TabsComponent,
            DevicesComponent,
            DataComponent,
            AdminComponent,
            Material,
            FormsModule,
            ReactiveFormsModule,
            FlexLayoutModule,
            ChartModule],
    entryComponents: [
                DialogComponent,
                AddDeviceComponent
    ]
})
export class ComponentModule {}

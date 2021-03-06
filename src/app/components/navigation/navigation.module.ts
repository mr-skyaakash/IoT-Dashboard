import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { Material } from '../../material.module';
import { AppRouting } from '../../app-routing.module';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        Material,
        AppRouting,
        HttpModule,
        FlexLayoutModule
    ],
    declarations: [
        HeaderComponent,
        SidenavComponent
    ],
    exports: [
        HeaderComponent,
        SidenavComponent,
        AppRouting,
        HttpModule,
    ]
})
export class NavigationModule {}

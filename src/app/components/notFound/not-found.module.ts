import { NgModule } from '@angular/core';
import { ErrorComponent } from './error/error.component';
import { CommonModule } from '@angular/common';
import { Material } from '../../material.module';
import { AppRouting } from '../../app-routing.module';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        CommonModule,
        Material,
        AppRouting,
        HttpModule,
    ],
    declarations: [
        ErrorComponent
    ],
    exports: [
        ErrorComponent,
        AppRouting,
        HttpModule,
    ]
})
export class NotFoundModule {}

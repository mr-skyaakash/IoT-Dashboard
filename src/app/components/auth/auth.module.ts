import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { Material } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouting } from '../../app-routing.module';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../environments/environment';
import { MomentModule } from 'angular2-moment';

@NgModule({
    imports: [
        CommonModule,
        Material,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        // BrowserAnimationsModule,
        AppRouting,
        HttpModule,
    ],
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    exports: [
        LoginComponent,
        SignupComponent,
        AppRouting,
        HttpModule,
    ]
})
export class AuthModule {}

import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { Material } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouting } from '../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../../environments/environment';
import { MomentModule } from 'angular2-moment';
import { CapitalizePipe } from '../../_pipes/capitalize.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClientInterceptor } from '../../services/auth/client.interceptor';
import { PipeModule } from '../../_pipes/pipe.module';

@NgModule({
    imports: [
        CommonModule,
        Material,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        // BrowserAnimationsModule,
        AppRouting,
        HttpClientModule,
        PipeModule
    ],
    declarations: [
        LoginComponent,
        SignupComponent,
    ],
    exports: [
        LoginComponent,
        SignupComponent,
        AppRouting,
        HttpClientModule,
        PipeModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ClientInterceptor,
            multi: true
        },
    ]
})
export class AuthModule {}

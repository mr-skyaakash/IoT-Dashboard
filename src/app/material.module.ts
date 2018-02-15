import { NgModule } from '@angular/core';
import { MatSidenavModule, MatToolbarModule, MatCardModule, MatListModule, MatButtonModule, MatSelectModule,
        MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatTabsModule,
        MatMenuModule, MatProgressBarModule} from '@angular/material';
import { CommonModule } from '@angular/common';
import { MqttService } from './services/mqtt.service';
import { AuthService } from './services/auth/auth.service';
import { ConnectService } from './services/devices/connect.service';

@NgModule({
    imports: [
            CommonModule,
            MatSidenavModule,
         MatToolbarModule,
          MatCardModule,
           MatListModule,
            MatButtonModule,
             MatSelectModule,
             MatIconModule,
             MatDialogModule,
             MatFormFieldModule,
             MatInputModule,
             MatSlideToggleModule,
             MatTabsModule,
             MatMenuModule,
             MatProgressBarModule
             ],
    exports: [ MatSidenavModule,
         MatToolbarModule,
          MatCardModule,
           MatListModule,
            MatButtonModule,
             MatSelectModule,
             MatIconModule,
             MatDialogModule,
             MatFormFieldModule,
             MatInputModule,
             MatSlideToggleModule,
             MatTabsModule,
             MatMenuModule,
             MatProgressBarModule
             ],
        providers: [
                MqttService,
                AuthService,
                ConnectService
        ]
})

export class Material {}

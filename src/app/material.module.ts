import { NgModule } from '@angular/core';
import { MatSidenavModule, MatToolbarModule, MatCardModule, MatListModule, MatButtonModule, MatSelectModule,
        MatIconModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatTabsModule, MatMenuModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';
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
             MatMenuModule
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
             MatMenuModule
             ],
        providers: [
                ChatService,
                WebsocketService,
                MqttService,
                AuthService,
                ConnectService
        ]
})

export class Material {}

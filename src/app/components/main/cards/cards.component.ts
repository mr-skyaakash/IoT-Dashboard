import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MatDialog } from '@angular/material';
import { WebsocketService } from '../../../services/websocket.service';
import { ChatService } from '../../../services/chat.service';
import { Subscription } from 'rxjs/Subscription';
import { MqttService } from '../../../services/mqtt.service';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor() {
    // this.sub = this.chat.messages.subscribe( msg => {
    //   console.log("Response from websocket : " + msg.message );
    // });
  }

  ngOnInit() {
  }

  // openWeb() {
  //   this.chat.messages.next(this.message);
  //   console.log("Message sent");
  // }

}

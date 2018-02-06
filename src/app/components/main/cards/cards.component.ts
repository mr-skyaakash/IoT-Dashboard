import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog.component';
import { WebsocketService } from '../../../services/websocket.service';
import { ChatService } from '../../../services/chat.service';
import { Subscription } from 'rxjs/Subscription';
import { MqttService } from '../../../services/mqtt.service';
import {Paho} from 'ng2-mqtt/mqttws31';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit, OnDestroy {

  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'LineChart'
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Line 1',
      data: [1, 2, 3]
    }]
  });

  sub: Subscription;
  newPoint: number;
  _client: Paho.MQTT.Client;

  private message = {
    author: 'tutorialedge',
    message: 'this is a test message'
  };

  constructor(private dialog: MatDialog, private chat: ChatService, private mqtt: MqttService) {
    // this.sub = this.chat.messages.subscribe( msg => {
    //   console.log('Response from websocket : ' + msg.message );
    // });
    this.mqtt.init();

    this.sub = this.mqtt.newData.subscribe( data => {
      this.chart.addPoint(data);
    });
    // this._client = new Paho.MQTT.Client('broker.mqttdashboard.com', 8000, 'clientID');

    // this._client.onConnectionLost = (responseObject: Object) => {
    //   console.log('Connection lost.');
    // };

    // this._client.onMessageArrived = (message: Paho.MQTT.Message) => {
    //   console.log('Message arrived.');
    // };

    // this._client.connect({ onSuccess: this.onConnected.bind(this) });
  }

  private onConnected(): void {
    this._client.subscribe('World', {onSuccess: this.onSubscribe});
    let message = new Paho.MQTT.Message('Hello');
    message.destinationName = 'World';
    this._client.send(message);
  }

  onSubscribe() {}

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( result !== false ) {
        this.chart.addPoint(parseInt(result, 10));
      }
    });

  }

  openWeb() {
    this.chat.messages.next(this.message);
    console.log('Message sent');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

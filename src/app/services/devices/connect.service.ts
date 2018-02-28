import { Injectable } from '@angular/core';
import {Paho} from 'ng2-mqtt/mqttws31';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ConnectService {

  private _client: Paho.MQTT.Client;
  sendData = new Subject<any>();
  private _topic: string;
  private _data: string;

  constructor() {

    this._client = new Paho.MQTT.Client('broker.mqttdashboard.com', 8000, 'ClientUI');
    this._client.onConnectionLost = this.onConnectionLost;
    this._client.onMessageArrived = this.onMessageArrived.bind(this);

    this._client.connect({onSuccess: this.onConnect.bind(this)});

    this.sendData.subscribe( info => {
      this._topic = info.topic;
      this._data = info.data;
      const message = new Paho.MQTT.Message(this._data);
      message.destinationName = this._topic;
      if ( this._client.isConnected()) {
        this._client.send(message);
      } else {
        console.log('Not Connected');
      }
    });
  }

  onConnectionLost() {
    console.log('Connection Lost');
  }

  onMessageArrived() {
    console.log('Message Arrived');
  }

  onMessageDelivered() {
    console.log('Message Delivered');
  }

  onConnect() {
    console.log('Connected');
  }

  publish(topic: string, data: string) {}

  subscribe(topic: string) {}
}

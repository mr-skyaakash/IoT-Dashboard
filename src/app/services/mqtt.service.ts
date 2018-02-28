import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {Paho} from 'ng2-mqtt/mqttws31';

@Injectable()
export class MqttService {

  private _client: Paho.MQTT.Client;
  newData = new Subject<number>();
  topic = 'Data';

  constructor() {
  }

  init() {
    this._client = new Paho.MQTT.Client('broker.mqttdashboard.com', 8000, 'clientID');
    // Create a client instance

    // set callback handlers
    this._client.onConnectionLost = this.onConnectionLost;
    this._client.onMessageArrived = this.onMessageArrived.bind(this);
    console.log(this._client);
    this._client.connect({onSuccess: this.onConnect.bind(this)});
  }

  // called when the this.client connects
  onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log('onConnect : ' + this._client);
    this._client.subscribe(this.topic, {onSuccess: this.onSubscribe});
    const message = new Paho.MQTT.Message('Hello');
    message.destinationName = 'World';
    this._client.send(message);
  }

  // called when the this._client loses its connection
  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  }

  onSubscribe() {
    console.log('Subscribed Successfully');
  }

  // called when a message arrives
  onMessageArrived(message) {
    console.log('onMessageArrived :' + message.payloadString);
    this.newData.next(
      parseInt(message.payloadString, 10)
    );
  }

}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MqttService {
  
  private client: any;
  newData = new Subject<number>();

  constructor() {
  }

  init() {
    this.client = new Paho.MQTT.Client('172.16.73.4', 1883, "clientId");
    // Create a client instance

    // set callback handlers
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
    // 'userName':'buejxdyr', 'password':'14_7MM9-anPM',
    // connect the this.client
    this.client.connect({ onSuccess: this.onConnect});
  }

  // called when the this.client connects
  onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    this.client.subscribe("World");
    let message = new Paho.MQTT.Message("Hello");
    message.destinationName = "World";
    this.client.send(message);
  }

  // called when the this.client loses its connection
  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
    this.newData.next(
      parseInt(message.payloadString)
    );
  }

}

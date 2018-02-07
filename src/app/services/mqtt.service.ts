import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
<<<<<<< 90cb9b12a35e19365e39164452380dc9e7850b53
import {Paho} from 'ng2-mqtt/mqttws31';

@Injectable()
export class MqttService {

  private _client: Paho.MQTT.Client;
  newData = new Subject<number>();
  topic = 'Data';
=======

@Injectable()
export class MqttService {
  
  private client: any;
  newData = new Subject<number>();
>>>>>>> Revert "mqtt-del"

  constructor() {
  }

  init() {
<<<<<<< 90cb9b12a35e19365e39164452380dc9e7850b53
    this._client = new Paho.MQTT.Client('broker.mqttdashboard.com', 8000, 'clientID');
    // Create a client instance

    // set callback handlers
    this._client.onConnectionLost = this.onConnectionLost;
    this._client.onMessageArrived = this.onMessageArrived.bind(this);
    // 'userName':'buejxdyr', 'password':'14_7MM9-anPM',
    // connect the this.client
    console.log(this._client);
    this._client.connect({onSuccess: this.onConnect.bind(this)});
=======
    this.client = new Paho.MQTT.Client('m14.cloudmqtt.com', 30635, "clientId");
    // Create a client instance

    // set callback handlers
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
    // 'userName':'buejxdyr', 'password':'14_7MM9-anPM',
    // connect the this.client
    this.client.connect({ 'userName':'buejxdyr', 'password':'14_7MM9-anPM',onSuccess: this.onConnect});
>>>>>>> Revert "mqtt-del"
  }

  // called when the this.client connects
  onConnect() {
    // Once a connection has been made, make a subscription and send a message.
<<<<<<< 90cb9b12a35e19365e39164452380dc9e7850b53
    console.log('onConnect : ' + this._client);
    this._client.subscribe(this.topic, {onSuccess: this.onSubscribe});
    let message = new Paho.MQTT.Message('Hello');
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
=======
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
>>>>>>> Revert "mqtt-del"
    );
  }

}

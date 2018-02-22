import { Injectable } from '@angular/core';
import { io } from 'socket.io';

@Injectable()
export class DeviceService {

  private static socket: any;
  private URL = 'http://192.168.100.11:5500/';

  constructor() {
  }

  connect() {
    DeviceService.socket = require('socket.io-client')(this.URL, {
      transport : ['websocket'],
      credentials : 'false'
    });
    console.log(DeviceService.socket);
    DeviceService.socket.on('connect', this.onConnect.bind(this));
    DeviceService.socket.on('event', this.onEvent.bind(this));
    DeviceService.socket.on('disconnect', this.onDisconnect.bind(this));
  }

  onConnect() {
    console.log('Connected');
  }

  onEvent(data) {
    console.log('Data received : ' + data);
  }

  onDisconnect() {
    console.log('Disconnected');
  }

  disconnect() {
    DeviceService.socket.close();
  }

}

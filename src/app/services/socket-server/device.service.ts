import { Injectable } from '@angular/core';
import { io } from 'socket.io';

@Injectable()
export class DeviceService {

  private URL = 'http://172.16.73.41:5000';

  constructor() {
    const socket = require('socket.io-client')(this.URL, {
      transport : ['websocket'],
      credentials : 'false'
    });
    console.log(socket);
    socket.on('connect', this.onConnect.bind(this));
    socket.on('event', this.onEvent.bind(this));
    socket.on('disconnect', this.onDisconnect.bind(this));
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

}

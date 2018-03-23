import { Injectable, OnDestroy } from '@angular/core';
import { io } from 'socket.io';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../../environments/environment';

@Injectable()
export class DeviceService {

  private static socket: any;
  private URL = environment.server;
  private email;
  newDeviceData = new Subject<number>();

  constructor() {
    this.email = this.getEmail() + '/monitor';
  }

  connect() {
    DeviceService.socket = require('socket.io-client')(this.URL, {
      transport : ['websocket'],
      credentials : 'false'
    });
    console.log(this.email);
    DeviceService.socket.on('connect', this.onConnect.bind(this));
    DeviceService.socket.on(this.email, this.onEvent.bind(this));
    // DeviceService.socket.on('yo', msg => {
    //   console.log(msg);
    // });
    DeviceService.socket.on('disconnect', this.onDisconnect.bind(this));
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  onConnect() {
    console.log('Connected');
  }

  onEvent(data) {
    this.newDeviceData.next(data);
  }

  onDisconnect() {
    console.log('Disconnected');
  }

  disconnect() {
    DeviceService.socket.close();
  }

}

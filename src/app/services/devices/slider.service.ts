import { Injectable } from '@angular/core';
import { io } from 'socket.io';
import { Subject } from 'rxjs/Subject';
import { Slider } from './config/slider.model';

@Injectable()
export class SliderService {

  private static socket: any;
  private URL = 'http://172.16.73.41:5000/';
  private namespace;
  private sliderDeviceList = new Array<Slider>();
  public sliderDevice = new Subject<Array<Slider>>();

  constructor() {
    this.namespace = 'device/slider';
  }

  connect() {
    this.sliderDeviceList = [];
    SliderService.socket = require('socket.io-client')(this.URL, {
      transport : ['websocket'],
      credentials : 'false'
    });
    console.log(this.namespace);
    SliderService.socket.on('connect', this.onConnect.bind(this));
    SliderService.socket.on(this.namespace+'/send', this.onEvent.bind(this));
    // SliderService.socket.on('yo', msg => {
    //   console.log(msg);
    // });
    SliderService.socket.on('disconnect', this.onDisconnect.bind(this));
  }

  onConnect() {
    console.log('Slider Connected');
  }

  sendVal(device ?: Slider) {
    if ( device === undefined) {
      SliderService.socket.emit(this.namespace, {"email": this.getEmail()});
    } else {
      SliderService.socket.emit(this.namespace, {"email": this.getEmail(), "dev": device})
    }
    console.log('sent');
  }

  getEmail() {
    return localStorage.getItem("email");
  }

  onEvent(msg) {
    console.log('Slider Received : '+msg);
     if ( JSON.parse(msg) !== [] ) {
      this.sliderDeviceList = JSON.parse(msg);
      this.sliderDevice.next(this.sliderDeviceList);
     }
  }

  disconnect() {
    SliderService.socket.close();
  }

  onDisconnect() {
    console.log('Slider Disconnected');
  }

}

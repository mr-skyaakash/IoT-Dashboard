import { Injectable } from '@angular/core';
import { Device } from './device.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AddDeviceService {

  private devicesList= new Array<Device>();
  public devices = new Subject<Device[]>();
  
  private _genId = 0;

  constructor() { }

  addDevice(devName, devTopic) {
    let dev = new Device;
    dev = {
      name: devName,
      topic: devTopic,
      id: this._genId++,
      active: false
    };
    this.devicesList.push(dev);
    this.devices.next(this.devicesList);
  }

  removeDevice(devId) {
    this.devicesList.forEach(element => {
      if ( element.id === devId ) {
        this.devicesList.splice(this.devicesList.indexOf(element),1);
        this.devices.next(this.devicesList);
      }
    });
  }

  modifyDevice(devId, devName, devTopic) {
    this.devicesList.forEach(element => {
      if ( element.id === devId ) {
        element.name = devName;
        element.topic = devTopic;
        this.devices.next(this.devicesList);
      }
    });
  }

  changeState(devId, devState) {
    this.devicesList.forEach(element => {
      if ( element.id === devId ) {
        element.active = devState;
        this.devices.next(this.devicesList);
      }
    });
  }

}

import { Injectable } from '@angular/core';
import { Device } from './device.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AddDeviceService {

  private devicesList = new Array<Device>();
  public devices = new Subject<Device[]>();
  private options: any;

  constructor(private http: Http) {
    const header = new Headers({'Access-Control-Allow-Origin': '*',
                                'content-type': 'application/json'});
    this.options = new RequestOptions({headers: header});

    this.http.get('http://192.168.100.11:5500/device', this.options).subscribe(res => {
      if ( res.status === 200 ) {
        this.devicesList.push(res.json().devices);
      }
    }, err => {
      console.log(err);
    });
  }

  addDevice(name, topic) {
    const dev = {
      devName: name,
      devTopic: topic,
    };
    this.http.post('http://192.168.100.11:5500/device/add', dev, this.options).subscribe(res => {
      if ( res.status === 201 ) {
        this.devicesList.push(res.json().device);
        this.devices.next(this.devicesList);
      }
    }, (err) => {
      console.log(err);
    });
  }

  removeDevice(devId) {
    this.devicesList.forEach(element => {
      if ( element.devId === devId ) {
        this.http.delete('http://192.168.100.11:5500/device/remove/' + element.devId, this.options).subscribe(res => {
          if ( res.status === 204 ) {
            this.devicesList.splice(this.devicesList.indexOf(element), 1);
            this.devices.next(this.devicesList);
          }
        }, (err) => {
          console.log(err);
        });
      } else {
        console.log('Device not found');
      }
    });
  }

  modifyDevice(devId, devName, devTopic) {
    this.devicesList.forEach(element => {
      if ( element.devId === devId ) {
        this.http.put('http://192.168.100.11:5500/device/modify', element, this.options).subscribe(res => {
          if ( res.status === 204 ) {
            element.devName = devName;
            element.devTopic = devTopic;
            this.devices.next(this.devicesList);
          }
        });
      } else {
        console.log('Device not found');
      }
    });
  }

  changeState(devId, devState) {
    this.devicesList.forEach(element => {
      if ( element.devId === devId ) {
        element.devState = devState;
        this.devices.next(this.devicesList);
      }
    });
  }

}

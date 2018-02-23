import { Injectable, OnDestroy } from '@angular/core';
import { Device } from './device.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AddDeviceService implements OnDestroy {

  private devicesList: Device[] = [];
  public devices = new Subject<Device[]>();
  private options: any;

  constructor(private http: Http) {
    const header = new Headers({'Access-Control-Allow-Origin': '*',
                                'content-type': 'application/json'});
    this.options = new RequestOptions({headers: header});
    this.devicesList = [];
    this.http.get('http://192.168.100.7:5500/device', this.options).subscribe(res => {
      if ( res.status === 200 ) {
        this.devicesList.push(...res.json().devices);
        console.log('Device List : ' + [...res.json().devices]);
        this.devices.next(this.devicesList);
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
    this.http.post('http://192.168.100.7:5500/device', dev, this.options).subscribe(res => {
      if ( res.status === 201 ) {
        console.log(res.json());
        this.devicesList.push(res.json());
        this.devices.next(this.devicesList);
      }
    }, (err) => {
      console.log(err);
    });
  }

  removeDevice(devId) {
    this.devicesList.forEach(element => {
      if ( element.devId === devId ) {
        this.http.delete('http://192.168.100.7:5500/device?id=' + element.devId, this.options).subscribe(res => {
          if ( res.status === 204 ) {
            this.devicesList.splice(this.devicesList.indexOf(element), 1);
            this.devices.next(this.devicesList);
          }
        }, (err) => {
          console.log(err);
        });
      }
    });
  }

  modifyDevice(id, name, topic) {
    const dev = {
      devId: id,
      devName: name,
      devTopic: topic
    };
    this.devicesList.forEach(element => {
      if ( element.devId === id ) {
        this.http.put('http://192.168.100.7:5500/device', dev , this.options).subscribe(res => {
          if ( res.status === 204 ) {
            element.devName = name;
            element.devTopic = topic;
            this.devices.next(this.devicesList);
          } else {
            console.log(res);
          }
        });
      }
    });
  }

  changeState(devId, devState) {
    // this.devicesList.forEach(element => {
    //   if ( element.devId === devId ) {
    //     element.devState = devState;
    //     this.devices.next(this.devicesList);
    //   }
    // });
  }

  ngOnDestroy() {
    this.devicesList = [];
  }

}

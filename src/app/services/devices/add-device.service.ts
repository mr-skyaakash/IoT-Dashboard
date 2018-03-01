import { Injectable, OnDestroy } from '@angular/core';
import { Device } from './device.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';

@Injectable()
export class AddDeviceService implements OnDestroy {

  private devicesList: Device[] = [];
  private UserList: User[] = [];
  public devices = new Subject<Device[]>();
  public users = new Subject<User[]>();

  generateHeader() {
    const options = new HttpHeaders({'Access-Control-Allow-Origin': '*',
                                    'content-type': 'application/json'});
    return options;
  }

  constructor(private http: HttpClient) {
    
    this.devicesList = [];
    this.http.get('http://172.16.73.41:5000/device', { headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
      if ( res.status === 200 ) {
        this.devicesList.push(...res.body.message);
        // console.log('Device List : ' + [...res.json().devices]);
        this.devices.next(this.devicesList);
      }
    }, err => {
      console.log(err);
    });
  }

  getUserList() {
    this.UserList = [];
    this.http.get('http://172.16.73.41:5000/admin/userdetails', { headers: this.generateHeader()}).subscribe( res => {
      console.log(res.message);
      this.users.next(res.message);
    });
  }

  getUserDevice(emailId) {
    const user = {
      email: emailId
    };
    this.http.post('http://172.16.73.41:5000/admin/userdetails', user,  { headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
      this.devices.next(res.body.message);
      this.devicesList.push(...res.body.message);
    }, err => {
      console.log(err);
    });
  }

  addDevice(name, topic, emailId) {
    const dev = {
      devname: name,
      devtopic: topic,
      email: emailId
    };
    this.http.post('http://172.16.73.41:5000/admin/deviceconfig', dev,{ headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
      if ( res.status === 200 ) {
        console.log(res.body);
        this.devicesList.push({
          devname: name,
          devtopic: topic
        });
        console.log('device list : ' + this.devicesList);
        this.devices.next(this.devicesList);
      }
    }, (err) => {
      console.log(err);
    });
  }

  removeDevice(devId) {
    // this.devicesList.forEach(element => {
    //   if ( element.devId === devId ) {
    //     this.http.delete('http://192.168.100.7:5500/device?id=' + element.devId, { headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
    //       if ( res.status === 204 ) {
    //         this.devicesList.splice(this.devicesList.indexOf(element), 1);
    //         this.devices.next(this.devicesList);
    //       }
    //     }, (err) => {
    //       console.log(err);
    //     });
    //   }
    // });
  }

  modifyDevice(id, name, topic) {
    // const dev = {
    //   devId: id,
    //   devName: name,
    //   devTopic: topic
    // };
    // this.devicesList.forEach(element => {
    //   if ( element.devId === id ) {
    //     this.http.put('http://192.168.100.7:5500/device', dev ,{ headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
    //       if ( res.status === 204 ) {
    //         element.devName = name;
    //         element.devTopic = topic;
    //         this.devices.next(this.devicesList);
    //       } else {
    //         console.log(res);
    //       }
    //     });
    //   }
    // });
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

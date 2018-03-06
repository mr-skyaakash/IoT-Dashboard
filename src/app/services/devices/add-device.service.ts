import { Injectable, OnDestroy } from '@angular/core';
import { Device } from './device.model';
import { DeviceInfo } from './device-info.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';

@Injectable()
export class AddDeviceService implements OnDestroy {

  private devicesList: Device[] = [];
  public devices = new Subject<Device[]>();
  private UserList: User[] = [];
  public users = new Subject<User[]>();
  private deviceInfoList: DeviceInfo[] = [];
  public deviceInfo = new Subject<Array<DeviceInfo>>();

  generateHeader() {
    const options = new HttpHeaders({'Access-Control-Allow-Origin': '*',
                                    'content-type': 'application/json'});
    return options;
  }

  constructor(private http: HttpClient) {
  }

  //admin functions
  
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
    this.devicesList = [];
    this.http.post('http://172.16.73.41:5000/admin/userdetails', user,  { headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
      this.devices.next(res.body.message);
      this.devicesList.push(...res.body.message);
    }, err => {
      console.log(err);
    });
  }

  addDevice(name, topic, type, emailId) {
    const dev = {
      devname: name,
      devtopic: topic,
      devtype: type,
      email: emailId
    };
    this.http.post('http://172.16.73.41:5000/admin/deviceconfig', dev,{ headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
      if ( res.status === 200 ) {
        console.log(res.body);
        this.devicesList.push({
          devname: name,
          devtopic: topic,
          devtype: type
        });
        console.log('device list : ' + this.devicesList);
        this.devices.next(this.devicesList);
      }
    }, (err) => {
      console.log(err);
    });
  }
  
  
  removeDevice(emailId, name) {
    this.devicesList.forEach(element => {
        if ( element.devname === name ) {
            this.http.delete('http://172.16.73.41:5000/admin/deviceconfig?email=' + emailId + '&dev='+ element.devname, { headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
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

  modifyDevice(emailId, id, name, topic, type) {
    const dev = {
        email: emailId,
        devname: id,
        new_devname: name,
        new_devtopic: topic,
        new_devtype: type
      };
      this.devicesList.forEach((element, index, array) => {
      if ( element.devname === id ) {
          this.http.put('http://172.16.73.41:5000/admin/deviceconfig', dev ,{ headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
          if ( res.status === 204 ) {
            array[index].devname = name;
            array[index].devtopic = topic;
            array[index].devtype = type;
          } else {
              console.log(res);
            }
          });
        }
      });
      this.devices.next(this.devicesList);
    }

// admin functions finish

    fetchUserControlDevice() {
      this.deviceInfoList = [];
      this.http.get('http://172.16.73.41:5000/device/control' ,{ headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
        if ( res.status === 200 ) {
          console.log(res)
          this.deviceInfoList.push(...res.body.message);
          // console.log('Device List : ' + [...res.json().devices]);
          this.deviceInfo.next(this.deviceInfoList);
        }
      }, err => {
        console.log(err);
      });
    }

    fetchUserMonitorDevice() {
      this.deviceInfoList = [];
      this.http.get('http://172.16.73.41:5000/device/monitor' ,{ headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
        if ( res.status === 200 ) {
          console.log(res)
          this.deviceInfoList.push(...res.body.message);
          // console.log('Device List : ' + [...res.json().devices]);
          this.deviceInfo.next(this.deviceInfoList);
        }
      }, err => {
        console.log(err);
      });
    }

    fetchDeviceType() {
      let types = [];
      this.http.get('http://172.16.73.41:5000/devicetype',{ headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {        if ( res.status === 200 ) {
        console.log(res.body);  
        types.push(...res.body);
        }
      }, err => {
        console.log(err);
      });
      return types;
    }
    
    changeState(devName, devStatus) {
    this.deviceInfoList.forEach(element => {
      if ( element.devname === devName ) {
        element.devstatus = devStatus;
        this.http.post('http://172.16.73.41:5000/device/deviceinfo', element , { headers: this.generateHeader(), observe: 'response'}).subscribe( res => {
          console.log(res);
        });
      }
    });
  }

  ngOnDestroy() {
    this.devicesList = [];
  }

}

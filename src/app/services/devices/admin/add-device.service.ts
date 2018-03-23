import { Injectable, OnDestroy } from '@angular/core';
import { Device } from '../device.model';
import { DeviceInfo } from '../device-info.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user.model';
import { MatSnackBar } from '@angular/material';
import { Control } from '../config/control.model';
import { Monitor } from '../config/monitor.model';
import { Slider } from '../config/slider.model';
import { DeviceType } from '../config/devicetype';
import { environment } from '../../../../environments/environment';


@Injectable()
export class AddDeviceService implements OnDestroy {

  private devicesList: Device[] = [];
  public devices = new Subject<Device[]>();
  private UserList: User[] = [];
  public users = new Subject<User[]>();
  private deviceInfoList: DeviceInfo[] = [];
  public deviceInfo = new Subject<Array<DeviceInfo>>();
  private server = environment.server;

  private userDevicesList: Array<any>;
  public userDevices = new Subject<Array<any>>();

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
    this.http.get<any>( this.server + 'admin/userdetails', { headers: this.generateHeader()}).subscribe( res => {
      console.log(res.message);
      this.users.next(res.message);
    });
  }

  getUserDevice(emailId) {
    const user = {
      email: emailId
    };
    this.userDevicesList = [];
    console.log('Device List Local : ' + this.userDevicesList);
    this.http.post( this.server + 'admin/userdetails', user,
                    { headers: this.generateHeader(), observe: 'response'} ).subscribe((res: any) => {
      const data = res.body.message;
      console.log(res.body.message);
      // console.log(this.userControlDevices);
      this.userDevicesList.push(...data);
      // // this.devices.next(res.body.message);
      this.userDevices.next(this.userDevicesList);
    }, err => {
      console.log(err);
    });
  }

  addDevice(name, topic, type, emailId, min ?: number, max ?: number, step ?: number) {
    // this.userDevicesList = [];
    const dev = {
      devname: name,
      devtopic: topic,
      devtype: type,
      email: emailId
    };
    if ( min !== undefined) {
      dev["devmin"] = min;
      dev["devmax"] = max;
      dev["devstep"] = step;
    }
    console.log(dev + ' ' + min);
    this.http.post( this.server + 'admin/deviceconfig', dev,{ headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
      if ( res.status === 200 ) {
        console.log(res.body);
        delete dev.email;
        this.userDevicesList.push(dev);
        console.log('device list : ' + this.userDevicesList);
        this.userDevices.next(this.userDevicesList);
      } else {
        console.log('Incorrect Response');
      }
    }, (err) => {
      console.log(err);
    });
  }


  removeDevice(emailId, name) {
    this.userDevicesList.forEach(element => {
        if ( element.devname === name ) {
            this.http.delete( this.server + 'admin/deviceconfig?email=' + emailId + '&dev='+ element.devname, 
                              { headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
                if ( res.status === 204 ) {
                  console.log('204 received');
                    for ( const item in DeviceType) {
                      if ( element.devtype === DeviceType[item]) {
                        this.userDevicesList.splice(this.userDevicesList.indexOf(element), 1);
                        this.userDevices.next(this.userDevicesList);
                      }
                  }
                    }
                }, (err) => {
                    console.log(err);
                  });
                }
    });
  }

  modifyDevice(emailId, id, name, topic, type, min ?: number, max ?: number, step ?: number) {
    const dev = {
        email: emailId,
        devname: id,
        new_devname: name,
        new_devtopic: topic,
        new_devtype: type
      };
      if ( min !== undefined) {
        dev["new_devmin"] = min;
        dev["new_devmax"] = max;
        dev["new_devstep"] = step;
      }
      this.userDevicesList.forEach((element, index, array) => {
      if ( element.devname === id ) {
          this.http.put( this.server + 'admin/deviceconfig', dev ,
                          { headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
          if ( res.status === 204 ) {
            array[index].devname = name;
            array[index].devtopic = topic;
            array[index].devtype = type;
            if ( min !== undefined) {
              array[index].devmin = min;
              array[index].devmax = max;
              array[index].devstep = step;
            }
          } else {
              console.log(res);
            }
          });
        }
      });
      this.userDevices.next(this.userDevicesList);
    }

// admin functions finish

// user functions

    fetchUserControlDevice() {
      this.deviceInfoList = [];
      this.http.get<any>( this.server + 'device/control' , { headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
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
      this.http.get<any>( this.server + 'device/monitor' ,{ headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
        if ( res.status === 200 ) {
          console.log(res);
          this.deviceInfoList.push(...res.body.message);
          // console.log('Device List : ' + [...res.json().devices]);
          this.deviceInfo.next(this.deviceInfoList);
        }
      }, err => {
        console.log(err);
      });
    }

    fetchDeviceType() {
      const types = [];
      this.http.get<any>( this.server + 'devicetype',
                    { headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {        if ( res.status === 200 ) {
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
        this.http.post( this.server + 'device/deviceinfo', element , 
                      { headers: this.generateHeader(), observe: 'response'}).subscribe( res => {
          console.log(res);
        });
      }
    });
  }

  ngOnDestroy() {
    this.userDevicesList = [];
  }

}

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


@Injectable()
export class AddDeviceService implements OnDestroy {

  private devicesList: Device[] = [];
  public devices = new Subject<Device[]>();
  private UserList: User[] = [];
  public users = new Subject<User[]>();
  private deviceInfoList: DeviceInfo[] = [];
  public deviceInfo = new Subject<Array<DeviceInfo>>();


  private userControlDevices: Control[] = [];
  private userMonitorDevices: Monitor[] = [];
  private userSliderDevices: Slider[] = [];

  private deviceTypeList = [this.userControlDevices,
                            this.userMonitorDevices,
                            this.userSliderDevices]

  private userDevicesList: Array<any>;
  public userDevices = new Subject<Array<any>>();


  

  generateHeader() {
    const options = new HttpHeaders({'Access-Control-Allow-Origin': '*',
                                    'content-type': 'application/json'});
    return options;
  }

  constructor(private http: HttpClient) {
  }

  generateDevice(name, topic, type, emailId, min ?: number, max ?: number, step ?: number) {
    if ( type === DeviceType.control ) {
      let device = new Control();
      device.devname = name;
      device.devstatus = null;
      device.devtopic = topic;
      device.devtype = type;
      console.log('My device : ' + device);
      this.userControlDevices.push(device);
      this.userDevicesList.push(...this.userControlDevices);
    } else if ( type === DeviceType.monitor ) {
      let device = new Monitor();
      device.devname = name;
      device.devstatus = null;
      device.devtopic = topic;
      device.devtype = type;
      device.devtime = null;
      this.userMonitorDevices.push(device);
      this.userDevicesList.push(...this.userMonitorDevices);
    } else {
      let device = new Slider();
      device.devname = name;
      device.devstatus = null;
      device.devtopic = topic;
      device.devtype = type;
      device.devtime = null;
      device.devmin = min;
      device.devmax = max;
      device.devstep = step; 
      this.userSliderDevices.push(device);
      this.userDevicesList.push(...this.userSliderDevices);
    }
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
    this.userControlDevices = [];
    this.userMonitorDevices = [];
    this.userSliderDevices = [];
    this.userDevicesList = [];
    console.log('Device List Local : ' + this.userDevicesList);
    this.http.post('http://172.16.73.41:5000/admin/userdetails', user,  { headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
      const data = res.body.message;
      console.log(res.body.message);
      for(let key in data) {
        if ( data[key].devtype === DeviceType.control ) {
            this.userControlDevices.push(data[key]);
          } else if ( data[key].devtype === DeviceType.monitor ) {
              this.userMonitorDevices.push(data[key]);
          } else {
              this.userSliderDevices.push(data[key]);
            }
      }
      // console.log(this.userControlDevices);
      this.userDevicesList.push(...this.userControlDevices);
      this.userDevicesList.push(...this.userMonitorDevices);
      this.userDevicesList.push(...this.userSliderDevices);
      console.log(this.userMonitorDevices);
      // // this.devicesList.push(...res.body.message);
      // // this.devices.next(res.body.message);
      this.userDevices.next(this.userDevicesList);
    }, err => {
      console.log(err);
    });
  }

  addDevice(name, topic, type, emailId, min ?: number, max ?: number, step ?: number) {
    this.userDevicesList = [];
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
    this.http.post('http://172.16.73.41:5000/admin/deviceconfig', dev,{ headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
      if ( res.status === 200 ) {
        console.log(res.body);
        this.generateDevice(name, topic, type, emailId, min, max, step);
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
            this.http.delete('http://172.16.73.41:5000/admin/deviceconfig?email=' + emailId + '&dev='+ element.devname, { headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
                if ( res.status === 204 ) {
                    for( let item in DeviceType) {
                      if ( element.devtype === DeviceType[item]) {
                        this.deviceTypeList[item].splice(this.deviceTypeList[item].indexOf(element));
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

  modifyDevice(emailId, id, name, topic, type) {
    const dev = {
        email: emailId,
        devname: id,
        new_devname: name,
        new_devtopic: topic,
        new_devtype: type
      };
      this.userDevicesList.forEach((element, index, array) => {
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
      this.userDevices.next(this.userDevicesList);
    }

// admin functions finish

// user functions

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
    this.userDevicesList = [];
  }

}

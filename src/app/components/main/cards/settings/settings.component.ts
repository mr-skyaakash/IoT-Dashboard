import { Component, OnInit } from '@angular/core';
import { AddDeviceComponent } from './add-device.component';
import { ConnectService } from '../../../../services/devices/connect.service';
import { MatDialog } from '@angular/material';
import { AddDeviceService } from '../../../../services/devices/admin/add-device.service';
import { Device } from '../../../../services/devices/device.model';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { ModifyDeviceComponent } from './modify-device.component';
import { User } from '../../../../services/devices/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  panelOpenState: boolean = false;
  showLoader: boolean = true;

  _devices = new Array<any>();
  _users = new Array<User>();
  private _deviceSubscription: Subscription;
  private _userSubscription: Subscription;

  constructor( private dialog: MatDialog, private deviceService: AddDeviceService) { }
  // private devices: ConnectService,
  ngOnInit() {
    this._deviceSubscription = this.deviceService.userDevices.subscribe(deviceList => {
      this._devices = deviceList;
      console.log(deviceList);
    });
    this._userSubscription = this.deviceService.users.subscribe(userList => {
      this.showLoader = false;
      this._users = userList;
      console.log(userList);
    });
    this.deviceService.getUserList();
  }

  addDevice(email) {
    const deviceDialog = this.dialog.open( AddDeviceComponent, {
      width: '350px',
    });

    deviceDialog.afterClosed().subscribe(result => {
      if ( result !== false ) {
        console.log(result);
        if ( Object.keys(result).length > 3 ) {
          console.log('slider');
          this.deviceService.addDevice(result.name, result.topic, result.type, email, result.min, result.max, result.step);
        } else {
          this.deviceService.addDevice(result.name, result.topic, result.type, email);
        }
      }
    });
    console.log(this._devices);
  }

  remove(email, dev) {
    this.deviceService.removeDevice(email, dev.devname);
  }

  modify(email, dev) {
    const deviceDialog = this.dialog.open(ModifyDeviceComponent, {
      width: '350px',
      data: {
        name: dev.devname,
        topic: dev.devtopic,
        type: dev.devtype
      }
    });

    deviceDialog.afterClosed().subscribe(result => {
      if ( result !== false ) {
        this.deviceService.modifyDevice(email, dev.devname , result.name,  result.topic, result.type);
      }
    });
  }

  panelOpen(email) {
    console.log('Opened');
    this._devices = [];
    this.deviceService.getUserDevice(email);
  }

  // findDevice(dev) {
  //   this._devices.forEach(element => {
  //     if ( element.id === dev.id ) {
  //       element.active = !element.active;
  //     }
  //   });
  // }

  // toggle(dev) {
  //   this.findDevice(dev);
  //   let topic = dev.topic;
  //   let data = dev.active ? 'on' : 'off';
  //   this.devices.sendData.next({
  //     'data': data,
  //     'topic': topic
  //   });
  //   // this.devices.onPublish({
  //   //   'data': data,
  //   //   'topic': topic
  //   // });
  // }

  ngOnDestroy() {
    this._deviceSubscription.unsubscribe();
    this._userSubscription.unsubscribe();
  }


}

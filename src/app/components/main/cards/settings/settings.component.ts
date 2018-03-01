import { Component, OnInit } from '@angular/core';
import { AddDeviceComponent } from './add-device.component';
import { ConnectService } from '../../../../services/devices/connect.service';
import { MatDialog } from '@angular/material';
import { AddDeviceService } from '../../../../services/devices/add-device.service';
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

  _devices = new Array<Device>();
  _users = new Array<User>();
  private _deviceSubscription: Subscription;
  private _userSubscription: Subscription;

  constructor( private dialog: MatDialog, private deviceService: AddDeviceService) { }
  // private devices: ConnectService,
  ngOnInit() {
    this._deviceSubscription = this.deviceService.devices.subscribe(deviceList => {
      this._devices = deviceList;
      console.log(deviceList);
    });
    this._userSubscription = this.deviceService.users.subscribe(userList => {
      this._users = userList;
      console.log(userList);
    });
    this.deviceService.getUserList();
  }

  addDevice(email) {
    const deviceDialog = this.dialog.open( AddDeviceComponent, {
    });

    deviceDialog.afterClosed().subscribe(result => {
      if ( result !== false ) {
        console.log(result);
        this.deviceService.addDevice(result.name, result.topic, email);
      }
    });
    console.log(this._devices);
  }

  remove(dev) {
    this.deviceService.removeDevice(dev.devId);
  }

  modify(dev) {
    const deviceDialog = this.dialog.open(ModifyDeviceComponent, {
      data: {
        name: dev.devName,
        topic: dev.devTopic
      }
    });

    deviceDialog.afterClosed().subscribe(result => {
      if ( result !== false ) {
        console.log(result);
        this.deviceService.modifyDevice(dev.devId , result.name, result.topic);
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

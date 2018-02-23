import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Device } from '../../../../services/devices/device.model';
import { AddDeviceService } from '../../../../services/devices/add-device.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { DeviceService } from '../../../../services/socket-server/device.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit, OnDestroy {

  _devices: Device[];
  private _deviceSubscription: Subscription;

  constructor(private deviceService: AddDeviceService, private serverDevice: DeviceService) {}

  ngOnInit() {
    this._deviceSubscription = this.deviceService.devices.subscribe(deviceList => {
      this._devices = deviceList;
      console.log('device list :' + deviceList);
    });
    console.log('list : ' + this._devices);
    // this.serverDevice.connect();
  }

  toggle(dev) {
    this.deviceService.changeState(dev.id, dev.active);
  }

  ngOnDestroy() {
    this._deviceSubscription.unsubscribe();
  }

}

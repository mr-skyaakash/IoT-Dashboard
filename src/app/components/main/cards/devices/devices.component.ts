import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Device } from '../../../../services/devices/device.model';
import { AddDeviceService } from '../../../../services/devices/add-device.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit, OnDestroy {

  _devices: Device[];
  private _deviceSubscription: Subscription;

  constructor(private deviceService: AddDeviceService) {}

  ngOnInit() {
    this._deviceSubscription = this.deviceService.devices.subscribe(deviceList => {
      this._devices = deviceList;
    });
  }

  toggle(dev) {
    this.deviceService.changeState(dev.id, dev.active);
  }

  ngOnDestroy() {
    this._deviceSubscription.unsubscribe();
  }

}

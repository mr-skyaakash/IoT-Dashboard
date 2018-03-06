import { Component, OnInit,Input, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DeviceInfo } from '../../../../services/devices/device-info.model';
import { AddDeviceService } from '../../../../services/devices/add-device.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { DeviceService } from '../../../../services/socket-server/device.service';
import { MainSlideAnimation } from '../../../../_animations/main-slide.animation';
import { MatSlideToggle } from '@angular/material'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
  animations: [ MainSlideAnimation ]
})
export class DevicesComponent implements OnInit, OnDestroy {

  _devices= new Array<DeviceInfo>();
  private _deviceSubscription: Subscription;

  constructor(private deviceService: AddDeviceService, private serverDevice: DeviceService, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this._deviceSubscription = this.deviceService.deviceInfo.subscribe(deviceList => {
      this._devices = deviceList;
    });
    // this.serverDevice.connect();
    this.deviceService.fetchUserControlDevice();
  }

  toggle(dev) { 
    dev.devstatus = dev.devstatus == 'on' ? 'off' : 'on';
    // this.matSlide._elementRef.nativeElement.checked = 'true';
    console.log(dev.devstatus);
    this.deviceService.changeState(dev.devname, dev.devstatus);

  }

  ngOnDestroy() {
    this._deviceSubscription.unsubscribe();
  }

}

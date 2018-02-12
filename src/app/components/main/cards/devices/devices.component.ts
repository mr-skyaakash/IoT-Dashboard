import { Component, OnInit } from '@angular/core';
import { AddDeviceComponent } from './add-device.component';
import { ConnectService } from '../../../../services/devices/connect.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  private genId = 0;
  private _devices = [];

  constructor(private devices: ConnectService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  addDevice() {
    const deviceDialog = this.dialog.open( AddDeviceComponent, {
    });

    deviceDialog.afterClosed().subscribe(result => {
      if( result !== false ) {
        this._devices.push({
          'name': result.name,
          'topic': result.topic,
          'id': this.genId,
          'active': false
        });
        this.genId++;
        console.log(this._devices);
      }
    });
  }

  findDevice(dev) {
    this._devices.forEach(element => {
      if ( element.id === dev.id ) {
        element.active = !element.active;
      }
    });
  }

  toggle(dev) {
    this.findDevice(dev);
    let topic = dev.topic;
    let data = dev.active ? 'on' : 'off';
    this.devices.sendData.next({
      'data': data,
      'topic': topic
    });
    // this.devices.onPublish({
    //   'data': data,
    //   'topic': topic
    // });
  }

}

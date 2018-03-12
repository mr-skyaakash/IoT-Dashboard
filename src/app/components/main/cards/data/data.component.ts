import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ChartComponent } from 'angular2-highcharts';
import { MatDialog } from '@angular/material';
import { MqttService } from '../../../../services/mqtt.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { OnDestroy } from '@angular/core';
import { DeviceService } from '../../../../services/socket-server/device.service';
import { AddDeviceService } from '../../../../services/devices/add-device.service';
import { DeviceInfo } from '../../../../services/devices/device-info.model';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit, OnDestroy {

  options= new Array<Object>();
  chart = new Array<Object>();

  sub: Subscription;
  newPoint: number;

  _devices= new Array<DeviceInfo>();
  private _deviceSubscription: Subscription;

  private _newDataSubscription: Subscription;

  private message = {
    author: 'tutorialedge',
    message: 'this is a test message'
  };

  constructor(private monitorService: AddDeviceService ,private deviceService: DeviceService ,private authService: AuthService , private dialog: MatDialog) {

    this._deviceSubscription = this.monitorService.deviceInfo.subscribe(deviceList => {
      this.options = [];
      this._devices = deviceList;
      for(let i=0; i<this._devices.length; i++ ) {
        this.options[i] = {
          chart: {
            type: 'line'
          },
          xAxis: {
            type: 'datetime',
            labels: {
              format: this._devices[i].devtime
            }
          },
          title: {
            text: this._devices[i].devname
          },
          series: [{
            data: this._devices[i].devstatus,
            dataLabels: this._devices[i].devtime
          }]
        };
      }
    });

    this.monitorService.fetchUserMonitorDevice();
    this.deviceService.connect();

    this._newDataSubscription = this.deviceService.newDeviceData.map(data => {
      return JSON.parse(data);
    }).subscribe( device => {
      this.options.forEach((element, index, array) => {
        console.log(element.title.text + ' and ' + device.devstatus );
        if ( element.title.text === device.devname ) {
          this.chart[index].series[0].addPoint(device.devstatus);
        }
      });
    });
  }

  ngOnInit() {
    if (this.authService.isAuth()) {
      // uncomment to work with MQTT service

      // this.mqtt.init();

      // this.sub = this.mqtt.newData.subscribe( data => {
      //   this.chart.series[0].addPoint(data);
    // });
    }

    
  }

  saveInstance(index, chartInstance) {
    this.chart[index] = chartInstance;
  }

  ngOnDestroy() {
    this._deviceSubscription.unsubscribe();
    this.deviceService.disconnect();
  }

}

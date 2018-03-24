import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ChartComponent } from 'angular2-highcharts';
import { MatDialog } from '@angular/material';
import { MqttService } from '../../../../services/mqtt.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { OnDestroy } from '@angular/core';
import { DeviceService } from '../../../../services/socket-server/device.service';
import { AddDeviceService } from '../../../../services/devices/admin/add-device.service';
import { DeviceInfo } from '../../../../services/devices/device-info.model';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit, OnDestroy {

  indiaUTC = 19800000;

  options = new Array<any>();
  chart = new Array<any>();

  sub: Subscription;
  newPoint: number;

  dataTuple = [[[]]];
  dates = [];

  _devices = new Array<DeviceInfo>();
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
      this.dataTuple = [[[]]];
      for (let i = 0; i < this._devices.length; i++ ) {

        for (let j = 0; j < this._devices[i].devstatus.length;j++) {
          console.log('Device Date : ' + this._devices[i].devtime);
          this.dataTuple[i][j] = [new Date(this._devices[i].devtime[j]).getTime()+ this.indiaUTC ,this._devices[i].devstatus[j]];
        }

        this.options[i] = {
          chart: {
            type: 'line'
          },
          xAxis: {
            type: 'datetime',
            // tickPositions: this._devices[i].devtime
            // categories: this._devices[i].devtime,
            labels: {
              format: '{value:%a %H:%M}'
            }
          },
          // plotOptions: {
          //   series: {
          //     pointStart: Date.UTC(2012, 0, 1),
          //     pointInterval: 24 * 3600 * 1000
          //   }
          // },
          title: {
            text: this._devices[i].devname
          },
          series: [{
            data: this.dataTuple[i],
          }]
        };

        console.log(this.options[i].series[0]);
      }
    });

    this.monitorService.fetchUserMonitorDevice();
    this.deviceService.connect();

    this._newDataSubscription = this.deviceService.newDeviceData.map(data => {
      return JSON.parse(data.toString());
    }).subscribe( device => {
      this.options.forEach((element, index, array) => {
        console.log(element.title.text + ' and ' + device.devstatus );
        if ( element.title.text === device.devname ) {
          this.chart[index].series[0].addPoint([new Date(device.devtime).getTime() + this.indiaUTC ,device.devstatus]);
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

  // for(let i=0;i< this._devices.length;i++) {
  //   for(let j=0;j<this._devices[i].devstatus.length;j++) {
  //     this.dataTuple[i][j] =  [this._devices[i].devtime[j],this._devices[i].devtime[j]];
  //     console.log(this._devices[i].devtime[j] + ' and ' +this._devices[i].devtime[j])
  //   }
  // }
  // console.log(this.dataTuple);

  saveInstance(index, chartInstance) {
    this.chart[index] = chartInstance;
  }

  ngOnDestroy() {
    this._deviceSubscription.unsubscribe();
    this.deviceService.disconnect();
  }

}

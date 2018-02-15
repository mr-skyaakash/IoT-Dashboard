import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ChartComponent } from 'angular2-highcharts';
import { MatDialog } from '@angular/material';
import { MqttService } from '../../../../services/mqtt.service';
import { DialogComponent } from './dialog.component';
import { AuthService } from '../../../../services/auth/auth.service';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit, OnDestroy {

  // chart = new ChartComponent({
  //   chart: {
  //     type: 'line'
  //   },
  //   title: {
  //     text: 'LineChart'
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   series: [{
  //     name: 'Line 1',
  //     data: [1, 2, 3]
  //   }]
  // });

  options: any;
  chart: any;

  sub: Subscription;
  newPoint: number;

  private message = {
    author: 'tutorialedge',
    message: 'this is a test message'
  };

  constructor(private authService: AuthService , private dialog: MatDialog, private mqtt: MqttService) {
    this.options = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'simple chart'
      },
      series: [{
        data: [1, 2, 3]
      }]
    };
  }

  ngOnInit() {
    if (this.authService.isAuth()) {
      this.mqtt.init();

      this.sub = this.mqtt.newData.subscribe( data => {
        this.chart.series[0].addPoint(data);
    });
    }
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result !== false ) {
        this.chart.series[0].addPoint(parseInt(result, 10));
      }
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

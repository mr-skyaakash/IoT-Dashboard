import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog.component';
import { WebsocketService } from '../../../services/websocket.service';
import { ChatService } from '../../../services/chat.service';
import { Subscription } from 'rxjs/Subscription';
import { MqttService } from '../../../services/mqtt.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ConnectService } from '../../../services/devices/connect.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AddDeviceComponent } from './add-device.component';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit, OnDestroy {

  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'LineChart'
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Line 1',
      data: [1, 2, 3]
    }]
  });

  sub: Subscription;
  newPoint: number;

  private message = {
		author: 'tutorialedge',
		message: 'this is a test message'
  }
  
  private genId = 0;
  private _devices = [];

  constructor(private authService: AuthService ,private dialog: MatDialog, private chat: ChatService, private mqtt: MqttService, private devices: ConnectService) {
    // this.sub = this.chat.messages.subscribe( msg => {
    //   console.log("Response from websocket : " + msg.message );
    // });
  }

  ngOnInit() {

    if(this.authService.isAuth()) {
      this.mqtt.init();

      this.sub = this.mqtt.newData.subscribe( data => {
        this.chart.addPoint(data);
    });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if( result !== false ) {
        
        this.chart.addPoint(parseInt(result));
      }
    });

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

  toggle(dev) {
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

  // openWeb() {
  //   this.chat.messages.next(this.message);
  //   console.log("Message sent");
  // }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

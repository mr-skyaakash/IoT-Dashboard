import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MatDialog } from '@angular/material';
import { DialogComponent } from './dialog.component';
import { WebsocketService } from '../../../services/websocket.service';
import { ChatService } from '../../../services/chat.service';
import { Subscription } from 'rxjs/Subscription';
import { MqttService } from '../../../services/mqtt.service';
import { AuthService } from '../../../services/auth/auth.service';

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

  constructor(private authService: AuthService ,private dialog: MatDialog, private chat: ChatService, private mqtt: MqttService) {
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

  // openWeb() {
  //   this.chat.messages.next(this.message);
  //   console.log("Message sent");
  // }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

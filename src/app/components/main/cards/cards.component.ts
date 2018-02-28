import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { MqttService } from '../../../services/mqtt.service';
import { AuthService } from '../../../services/auth/auth.service';
import { SidenavMainService } from '../../../services/sidenav-main/sidenav-main.service';
import { MainSlideAnimation } from '../../../_animations/main-slide.animation';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  animations: [ MainSlideAnimation ]
})
export class CardsComponent implements OnInit {

  arr = [false, false, false, false];
  states = ['inactive', 'inactive', 'inactive', 'inactive'];

  constructor(private sidenavMain: SidenavMainService) {
    this.sidenavMain.currentActive.subscribe(index => {
      for (let i = 0 ; i < this.arr.length; i++) {
        this.arr[i] = false;
        this.states[i] = 'inactive';
        if ( i === index ) {
          this.arr[i] = true;
          this.states[i] = 'active';
        }
      }
      console.log(this.states);
    });
  }

  ngOnInit() {
  }

}

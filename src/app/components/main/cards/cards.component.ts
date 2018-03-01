import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { MqttService } from '../../../services/mqtt.service';
import { AuthService } from '../../../services/auth/auth.service';
import { SidenavMainService } from '../../../services/sidenav-main/sidenav-main.service';
import { MainSlideAnimation } from '../../../_animations/main-slide.animation';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  animations: [ MainSlideAnimation ]
})
export class CardsComponent implements OnInit {

  arr = [true, false, false, false];
  states = ['active', 'inactive', 'inactive', 'inactive'];
  showSettings = false;

  constructor(private sidenavMain: SidenavMainService,private authService: AuthService) {
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
    this.showSettings = this.authService.getUserRole();
    console.log(this.showSettings);

  }

  ngOnInit() {
  }

}

import { Component } from '@angular/core';
import { SlideUpAnimation } from './_animations/slide-up.animation';
import { SlideLeftAnimation } from './_animations/slide-left.animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  // 
  animations: [ SlideUpAnimation ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  outlet: RouterOutlet;
  constructor() {

  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}

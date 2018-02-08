import { Component } from '@angular/core';
import { SlideUpAnimation } from './_animations/slide-up.animation';

@Component({
  selector: 'app-root',
  animations: [SlideUpAnimation],
  host: { '@slideUpAnimation' : '' },
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { SliderService } from '../../../../services/devices/slider.service';
import { Slider } from '../../../../services/devices/config/slider.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {

  sliderDevices = new Array<Slider>();
  sliderDeviceSubscription: Subscription;

  constructor(private sliderService: SliderService) {
    this.sliderService.connect();
    this.sliderService.sendVal();
    this.sliderDeviceSubscription = this.sliderService.sliderDevice.subscribe( data => {
      this.sliderDevices = data;
    });
  }

  changedVal(dev, event) {
    console.log(event);
    dev.devstatus = event.value;
    console.log(dev.devstatus);
    this.sliderService.sendVal(dev);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sliderService.disconnect();
    this.sliderDeviceSubscription.unsubscribe();
  }

}

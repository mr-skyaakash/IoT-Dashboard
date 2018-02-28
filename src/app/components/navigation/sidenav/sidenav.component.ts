import { Component, OnInit } from '@angular/core';
import { SidenavMainService } from '../../../services/sidenav-main/sidenav-main.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  arr = [false, false, false, false];

  constructor(private sidenavMain: SidenavMainService) { }

  ngOnInit() {
  }

  select(index) {
    this.sidenavMain.selectIndex(index);

    for (let i = 0; i < this.arr.length; i++) {
      this.arr[i] = false;
      if ( i === index) {
        this.arr[i] = true;
      }
    }
  }

}

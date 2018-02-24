import { Component, OnInit } from '@angular/core';
import {} from '../../../_animations/slide-left.animation';
import { AuthService } from '../../../services/auth/auth.service';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, OnDestroy {

  isAdmin = false;
  user: any;

  constructor(private authService: AuthService) {
    this.isAdmin = this.authService.getUserRole();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}

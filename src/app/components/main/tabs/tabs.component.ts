import { Component, OnInit } from '@angular/core';
import {} from '../../../_animations/slide-left.animation';
import { AuthService } from '../../../services/auth/auth.service';
import { ClientRoleService } from '../../../services/auth/client-role.service';
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

  constructor(private clientRoleService: ClientRoleService, private authService: AuthService) {
    this.user = this.authService.getUser();
    this.isAdmin = this.clientRoleService.isAdmin(this.user);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}

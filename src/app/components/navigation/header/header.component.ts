import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sidenav = new EventEmitter<void>();
  private isAuth = false;
  authSubscription: Subscription;
  constructor(private _service: AuthService) { }

  ngOnInit() {
    this.authSubscription = this._service.authChange.subscribe( auth => {
      this.isAuth = auth;
    });
  }

  sidenavOpen() {
    this.sidenav.emit();
  }

  onLogout() {
    console.log('Logout');
    this._service.logout();
    console.log('Logout Complete');
  }

}

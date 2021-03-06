import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sidenave = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;
  doLogin = false;
  doSignup = false;
  private url: string;

  constructor(private _service: AuthService, private router: Router ) { }

  ngOnInit() {
    this.authSubscription = this._service.authChange.subscribe( auth => {
      this.isAuth = auth;
    });

    this.router.events.subscribe((event) => {

      if ( event instanceof NavigationEnd ) {
        this.url = this.router.url;
        if ( this.url.toString() === '/login' ) {
          this.doLogin = false;
          this.doSignup = true;
        } else if ( this.url.toString() === '/signup' ) {
          this.doLogin = true;
          this.doSignup = false;
        } else {
        this.doSignup = this.doLogin = false;
        }
      }
    });
  }

  sidenavOpen() {
    this.sidenave.emit();
  }

  toggleSidenav() {
    this.sidenave.emit();
  }

  onLogout() {
    this._service.logout();
  }

}

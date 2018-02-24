import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { SlideUpAnimation } from '../../../_animations/slide-up.animation';
import { INVALID } from '@angular/forms/src/model';
import { MatSnackBar } from '@angular/material';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  animations: [SlideUpAnimation],
  host: { '@slideUpAnimation' : '' },
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  load =  false;
  statusSubscription: Subscription;

  constructor(private service: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: this.email = new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: this.password = new FormControl('', {
        validators: [Validators.required, Validators.minLength(4)]
      })
    });

    this.statusSubscription = this.service.status.subscribe(resp => {
      if ( resp !== true ) {
        this.stopLoading();
          if ( resp === false ) {
            this.snackBar.open( 'Incorrect Credentials !', 'OK', {
              duration: 5000,
            });
          } else {
            this.snackBar.open( 'Server Error !', 'OK', {
              duration: 5000,
            });
          }
        }
    });
  }

  loading() {
    this.load = true;
    this.loginForm.disable();
  }

  stopLoading() {
    this.load = false;
    this.loginForm.enable();
  }

  swipe() {
    console.log('Swipe-up');
    this.router.navigate(['/signup']);
  }

  onSubmit() {
    this.loading();

    this.service.login( {
      email: this.email.value,
      password: this.password.value
    });

    }

    ngOnDestroy() {
      this.statusSubscription.unsubscribe();
    }

}

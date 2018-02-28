import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { SlideUpAnimation } from '../../../_animations/slide-up.animation';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-signup',
  animations: [SlideUpAnimation],
  host: { '@slideUpAnimation' : '' },
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  role: FormControl;
  roles: Array<any>;
  rolesSubscription: Subscription;
  constructor(private service: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      name: this.name = new FormControl('', {
        validators: [Validators.required]
      }),
      email: this.email = new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: this.password = new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      role: this.role = new FormControl('', {
        validators: [Validators.required]
      })
    });

    this.rolesSubscription = this.service.roles.subscribe(data => {
      this.roles = data;
    });
  }

  onSubmit() {
    this.service.signup( {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      role: {
        rolename: this.role.value
      }
    });
  }

  ngOnDestroy() {
    this.rolesSubscription.unsubscribe();
  }

}

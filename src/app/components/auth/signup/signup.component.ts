import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { SlideUpAnimation } from '../../../_animations/slide-up.animation';

@Component({
  selector: 'app-signup',
  animations: [SlideUpAnimation],
  host: { '@slideUpAnimation' : '' },
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  loginForm: FormGroup;
  name: FormControl;
  email: FormControl;
  password: FormControl;
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
      })
    });
  }

  onSubmit() {
    this.service.signup( {
      name: this.name.value,
      email: this.email.value,
      password: this.password.value
    });
  }

}

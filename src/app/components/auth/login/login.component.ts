import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  
  constructor(private service: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: this.email = new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: this.password = new FormControl('',{
        validators: [Validators.required, Validators.minLength(6)]
      })
    });
  }

  onSubmit() {
    this.service.login( {
      email: this.email.value,
      password: this.password.value
    });
  }

}

import { Injectable } from '@angular/core';
import { User } from './user.model';
import { LoginUser } from './login-user.model';
import { SignupUser } from './signup-user.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import {Headers, RequestOptions, Http} from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { DeviceService } from '../socket-server/device.service';
import * as moment from 'moment';

@Injectable()
export class AuthService {

    private _isAdmin: any;
    status = new Subject<any>();
    authChange = new Subject<boolean>();

    constructor(private router: Router, private http: Http, private deviceServer: DeviceService) {}

    login(loginUser: LoginUser) {
        const header = new Headers({'Access-Control-Allow-Origin': '*',
                                'content-type': 'application/json'});
        const options = new RequestOptions({headers: header});
        const user = {
                email: loginUser.email,
                password: loginUser.password
        };
        console.log('login');
            this.http.post('http://172.16.73.32:5000/auth/login', JSON.stringify(user), options).subscribe(res => {
                if ( res.status === 200 ) {
                    this.router.navigate(['/']);
                    this.status.next(true);
                    // this._isAdmin = true;
                    console.log(res);
                    this.setSession(res);
                }
            }, (err: HttpErrorResponse) => {
                if ( err.status === 401 ) {
                    this.status.next(false);
                } else {
                    this.status.next('error');
                }
            });
        // this.authChange.next(true);
        // this.router.navigate(['/']);
        // this._user = user;
        // this.status.next(true);
    }

    signup(signupUser: SignupUser) {
        const user = {
            user: {
                uname: signupUser.email,
                password: signupUser.password
            }
        };
        this.router.navigate(['/']);
        this.status.next(true);
        this._isAdmin = true;
    }

    private setSession(res) {
        const expiresAt = moment().add(10000, 'second');
        console.log(res.json().auth_token);
        localStorage.setItem('token_id', res.json().auth_token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return expiresAt;
    }

    logout() {
        console.log(localStorage.getItem('token_id'));
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.deviceServer.disconnect();
        localStorage.removeItem('token_id');
        localStorage.removeItem('expires_at');
    }

    isAuth() {
        // if ( this._user === undefined || this._user === null ) {
        //     return false;
        // }
        // return true;
        if (moment().isBefore(this.getExpiration())) {
            this.authChange.next(true);
            return true;
        }
        return false;

    }

    getUserRole() {
        // return {...this._user};
        return this._isAdmin;
    }
}

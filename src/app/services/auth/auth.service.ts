import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthUser } from './auth-user.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import {Headers, RequestOptions, Http} from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { ClientRoleService } from './client-role.service';
import { DeviceService } from '../socket-server/device.service';
import * as moment from 'moment';

@Injectable()
export class AuthService {

    private _user: any;
    status = new Subject<any>();
    authChange = new Subject<boolean>();

    constructor(private router: Router, private http: Http, private deviceServer: DeviceService) {}

    login(authUser: AuthUser) {
        const header = new Headers({'Access-Control-Allow-Origin': '*',
                                'content-type': 'application/json'});
        const options = new RequestOptions({headers: header});
        const user = {
                email: authUser.email,
                password: authUser.password
        };
            this.http.post('http://172.16.73.32:5000/auth/login', JSON.stringify(user), options).subscribe(res => {
                if ( res.status === 200 ) {
                    this.authChange.next(true);
                    this.router.navigate(['/']);
                    this._user = user;
                    this.status.next(true);
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

    signup(authUser: AuthUser) {
        const user = {
            user: {
                uname: authUser.email,
                password: authUser.password
            }
        };
        this.authChange.next(true);
        this.router.navigate(['/']);
        this._user = user;
        this.status.next(true);
    }

    private setSession(res) {
        const expiresAt = moment().add(res.expiresIn, 'second');

        localStorage.setItem('token_id', res.token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return expiresAt;
    }

    logout() {
        this._user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.deviceServer.disconnect();
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
    }

    isAuth() {
        // if ( this._user === undefined || this._user === null ) {
        //     return false;
        // }
        // return true;

        return moment().isBefore(this.getExpiration());
    }

    getUser() {
        return {...this._user};
    }
}

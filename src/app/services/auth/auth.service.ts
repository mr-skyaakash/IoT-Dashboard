import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthUser } from './auth-user.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import {Headers, RequestOptions, Http} from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { ClientRoleService } from './client-role.service';
@Injectable()
export class AuthService {

    private _user: any;
    status = new Subject<any>();
    authChange = new Subject<boolean>();

    constructor(private router: Router, private http: Http) {}

    login(authUser: AuthUser) {
        const header = new Headers({'Access-Control-Allow-Origin': '*',
                                'content-type': 'application/json'});
        const options = new RequestOptions({headers: header});
        const user = {
            user: {
                uname: authUser.email,
                password: authUser.password
            }
        };
            this.http.post('https://192.168.100.7:5500/login', JSON.stringify(user), options).subscribe(res => {
                if ( res.status === 200 ) {
                    this.authChange.next(true);
                    this.router.navigate(['/']);
                    this._user = user;
                    this.status.next(true);
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

    logout() {
        this._user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    isAuth() {
        if ( this._user === undefined || this._user === null ) {
            return false;
        }
        return true;
    }

    getUser() {
        return {...this._user};
    }
}

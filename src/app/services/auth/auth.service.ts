import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthUser } from './auth-user.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import {Headers, RequestOptions, Http} from '@angular/http';
@Injectable()
export class AuthService {

    private _user: any;
    private status: number;
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
        this.http.post('http://172.16.73.32:5000/login', JSON.stringify(user), options).subscribe(res => {
            console.log(res);
            this.status = res.status;
            if ( this.status === 200 ) {
                this.authChange.next(true);
                console.log('its true');
                this.router.navigate(['/']);
                this._user = user;
            }
        });
    }

    signup(authUser: AuthUser) {
        this._user = {
            email: authUser.email,
            userId: Math.floor(Math.random() * 1000).toString()
        };
        this.authChange.next(true);
        this.router.navigate(['/']);
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

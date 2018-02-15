import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthUser } from './auth-user.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {

    private _user: any;
    private status: string;
    authChange = new Subject<boolean>();

    constructor(private router: Router, private http: Http) {}

    login(authUser: AuthUser) {
        this._user = {
            user: {
                uname: authUser.email,
                password: authUser.password
            }
        };
        console.log(this._user);
        this.http.post('172.16.72.32:5000/login', this._user).map(res => {
            console.log(res);
            this.status = res.toString();
        });
        if ( this.status === 'success' ) {
            this.authChange.next(true);
            this.router.navigate(['/']);
        }

    }

    signup(authUser: AuthUser) {
        this._user = {
            email: authUser.email,
            userId: Math.floor(Math.random()*1000).toString()
        }
        this.authChange.next(true);
        this.router.navigate(['/']);
    }

    logout() {
        this._user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    isAuth() {
        if ( this._user === undefined || this._user === null )
            return false;
        return true;
    }

    getUser() {
        return {...this._user};
    }
}
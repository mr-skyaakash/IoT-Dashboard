import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { AuthUser } from "./auth-user.model";
import { Subject } from "rxjs/Subject";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

    private _user: User;
    authChange = new Subject<boolean>();

    constructor(private router: Router) {}

    login(authUser: AuthUser) {
        this._user = {
            email: authUser.email,
            userId: Math.floor(Math.random()*1000).toString()
        }
        this.authChange.next(true);
        this.router.navigate(['/']);
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
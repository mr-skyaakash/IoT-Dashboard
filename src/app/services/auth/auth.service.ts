import { Injectable } from '@angular/core';
import { User } from './user.model';
import { LoginUser } from './login-user.model';
import { SignupUser } from './signup-user.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { DeviceService } from '../socket-server/device.service';
import * as moment from 'moment';

@Injectable()
export class AuthService {

    private _isAdmin: any = false;
    status = new Subject<any>();
    roles = new Subject<any>();
    authChange = new Subject<boolean>();

    constructor(private router: Router, private http: HttpClient , private deviceServer: DeviceService) {
    }

    fetchRoles() {
        console.log('Fetching roles');
        this.http.get('http://172.16.73.41:5000/roles', {headers: this.generateHeader(), observe: 'response'}).subscribe(resp => {
             this.roles.next(resp.body);
             console.log(resp);
        }, err => {
            console.log(err);
        });
    }

    generateHeader() {
        const header = new Headers({'Access-Control-Allow-Origin': '*',
                                'content-type': 'application/json'});
        const options = new HttpHeaders({'Access-Control-Allow-Origin': '*',
                                        'content-type': 'application/json'});
        return options;
    }

    login(loginUser: LoginUser) {
        const user = {
                email: loginUser.email,
                password: loginUser.password
        };
        this.clearEmail();
        console.log('login');
            this.http.post('http://172.16.73.41:5000/auth/login', JSON.stringify(user),
                            { headers: this.generateHeader(), observe: 'response'} ).subscribe(res => {
                if ( res.status === 200 ) {
                    this.router.navigate(['/']);
                    this.status.next(true);
                    this.storeEmail(loginUser.email);
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
                username: signupUser.name,
                email: signupUser.email,
                password: signupUser.password,
                role: signupUser.role
        };
        this.clearEmail();
        console.log(signupUser);
        this.http.post('http://172.16.73.41:5000/auth/register', user,
                        { headers: this.generateHeader() , observe: 'response'} ).subscribe(resp => {
            if ( resp.status === 201 ) {
                console.log(resp);
                this.storeEmail(signupUser.email);
                this.router.navigate(['/']);
                    this.status.next(true);
                    console.log(resp);
                    this.setSession(resp);
                    this.router.navigate(['/']);
                    this.status.next(true);
            }
        }, err => {
            console.log(err);
        });
    }

    private storeEmail(email) {
        localStorage.setItem('email',email);
    }

    private clearEmail() {
        localStorage.removeItem('email');
    }

    private setSession(res) {
        const expiresAt = moment().add(10000, 'second');
        console.log(res.body.auth_token);
        if ( res.body.status === 'ADMIN' ) {
            localStorage.setItem('role',"ADMIN");        
        }
        localStorage.setItem('token_id', res.body.auth_token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return expiresAt;
    }

    logout() {
        console.log(localStorage.getItem('token_id'));
        this.http.post('http://172.16.73.41:5000/auth/logout',
                        { headers: this.generateHeader() , observe: 'response'} ).subscribe(resp => {
            console.log(resp);
        }, err => {
            console.log(err);
        });
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this._isAdmin = false;
        // this.deviceServer.disconnect();
        this.clearEmail();

        localStorage.removeItem('token_id');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('role');
    }

    isAuth() {
        // if ( this._user === undefined || this._user === null ) {
        //     return false;
        // }
        // this.authChange.next(true);
        // this._isAdmin = true;
        // return true;
        if (moment().isBefore(this.getExpiration())) {
            this.authChange.next(true);
            // this._isAdmin = true;
            return true;
        }
        return false;

    }

    getUserEmail() {}

    getUserRole() {
        // return {...this._user};
        // return this._isAdmin;
        if ( localStorage.getItem('role')) {
            return true;
        }
        return false;
    }
}

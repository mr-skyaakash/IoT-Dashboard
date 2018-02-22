import { Injectable } from "@angular/core";
import * as user from './user.json';
import { Subject } from "rxjs/Subject";

@Injectable()
export class ClientRoleService {

    userList = (<any>user).users;

    constructor() {
    }

    isAdmin(user) {
        for ( let item in this.userList) {
            if ( this.userList[item].urole === 'admin' && this.userList[item].uname === user.user.uname ) {
                return true;
            }
        }
        return false;
    }
}

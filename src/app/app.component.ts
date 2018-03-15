import { Component, OnInit, ViewChild } from '@angular/core';
import { SlideUpAnimation } from './_animations/slide-up.animation';
import { SlideLeftAnimation } from './_animations/slide-left.animation';
import { RouterOutlet } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { PushService } from './services/push-notify/push.service';
import { AuthService } from './services/auth/auth.service';
import { MatSidenav } from '@angular/material';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscribe } from '@firebase/util';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  animations: [ SlideUpAnimation ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  itemsArr: Array<any>;
  items: any;
  messaging: any;
  isAuth = false;
  @ViewChild('sidenav') sidenav: MatSidenav;
  watcher: Subscription;
  activeMediaQuery = "";
  sidenavMode: string;
  sidenavOpened: boolean;

  pushData: any = {
    'notification': {
        'title': 'Background Message Title',
        'body': 'Background Message Body'
        },
        'to': ''
   };

  outlet: RouterOutlet;

  constructor( media: ObservableMedia ,private db: AngularFireDatabase, private pushService: PushService, private authService: AuthService) {
    this.messaging = firebase.messaging();

    this.messaging.onTokenRefresh(function () {
      this.messaging.getToken()
        .then(function (refreshedToken) {
          console.log('Token refreshed.');
        })
        .catch(function (err) {
          console.log('Unable to retrieve refreshed token ', err);
        });
    });

    this.authService.authChange.subscribe( auth => {
      this.isAuth = auth;
    });

    this.itemsArr = [];  // Reinitialize the array to prevent data duplication
    this.items = this.db.list('items').snapshotChanges()
                        .subscribe(snapshots => {
                        snapshots.forEach(snapshot => {
                          this.itemsArr.push(snapshot.payload);
                        });
                      });

    this.messaging.onMessage(function (payload) {
      console.log('Message received. ', payload);
    });

    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      if ( change.mqAlias !== 'xs' ) {
        this.loadPersistentSidenav();
      } else {
        this.loadMinimizedSidenav();
      }
    });
  }

  ngOnInit() {
    const self = this;
    this.items = this.db.list('/items');
    this.messaging.requestPermission()
      .then(function () {
        console.log('Notification permission granted.');
        self.messaging.getToken()
          .then(function (currentToken) {
            if (currentToken) {
              self.pushData.to = currentToken;
              // const key = prompt('take the key', self.pushData.to);
              // Set a timeout so as to enable all the data to be loaded
              setTimeout(() => {
                if (self.checkToken(self.pushData.to, self.itemsArr) === 0) {
                  console.log('Push occurrence');
                  self.items.push({ tokenID: currentToken });
                } else {
                  console.log('User is already subscribed');
                }
              }, 6500);
              // Displays the current token data
              console.log('currentToken: ', currentToken);
              } else {
              // Show permission request.
              console.log('No Instance ID token available. Request permission to generate one.');
            }
          })
          .catch(function (err) {
            console.log('An error occurred while retrieving token.', err);
          });
      })
      .catch(function (err) {
        console.log('Unable to get permission to notify. ', err);
    });
  }

  generatePush() {
      if (this.pushData.to === '') {
        console.log('No token available');
        return;
      }
      this.pushService.generatePush(this.pushData)
      .subscribe(data => { console.log('Succesfully Posted'); }, err => console.log(err));
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  checkToken(token, arr) {
      let counter = 0;
      for (let i = 0; i < arr.length; i++) {
      if (arr[i] === token) {
              counter++;
          }
      }
      console.log('Counter value', counter);
      return counter;
  }
  toggle() {
    console.log(this.sidenavMode);
    // this.sidenavMode = this.sidenavMode === 'push' ? 'side' : 'push';
    this.sidenav.toggle();
  }

  loadPersistentSidenav() {
    this.sidenavOpened = true;
    this.sidenavMode = 'side';
  }

  loadMinimizedSidenav() {
    this.sidenavOpened = false;
    this.sidenavMode = 'push';
  }

  preventClose() {
    this.sidenav.disableClose = true;
  }


}

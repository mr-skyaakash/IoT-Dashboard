import { Component, OnInit } from '@angular/core';
import { SlideUpAnimation } from './_animations/slide-up.animation';
import { SlideLeftAnimation } from './_animations/slide-left.animation';
import { RouterOutlet } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { PushService } from './services/push-notify/push.service';

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

  pushData: any = {
    'notification': {
        'title': 'Background Message Title',
        'body': 'Background Message Body'
        },
        'to': ''
   };

  outlet: RouterOutlet;

  constructor(private db: AngularFireDatabase, private pushService: PushService) {
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

    this.itemsArr = [];  // Reinitialize the array to prevent data duplication
    this.items = this.db.list('items').snapshotChanges()
                        .subscribe(snapshots => {
                        snapshots.forEach(snapshot => {
                          console.log('Snapshot : ' + snapshot.payload.key);
                          this.itemsArr.push(snapshot.payload);
                        });
                      });

    this.messaging.onMessage(function (payload) {
      console.log('Message received. ', payload);
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
              console.log(self.pushData.to);
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


}

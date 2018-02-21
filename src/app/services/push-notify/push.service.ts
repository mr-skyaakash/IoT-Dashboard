import { Injectable } from '@angular/core';
import { RequestOptions, Http } from '@angular/http';

@Injectable()
export class PushService {

  pushData: any;
  head: any;

  constructor(private http: Http) {
    this.head = new Headers({ 'Content-Type': 'application/json',
                               'Authorization': 'key=AAAAAXMaKFI:APA91bHYNTHA-509K0eMXm1aKBRwp9iV0lq1K2VaUKrxL8rmddv5NgRsBswRJo3bfrT5KchHiBiiPhkye_wkURXSzSHgcuQGFyy44EviHfLMPM0CjH3uQ6c8UHXF3sgWTTSOwjMGPSjL'});

    this.pushData = {
      'notification': {
          'title': 'Background Message Title',
          'body': 'Background Message Body'
          },
          'to': ''
     };
  }

  generatePush(pushData) {
    const options = new RequestOptions({
      headers: this.head
    });
    return this.http.post('https://fcm.googleapis.com/fcm/send', pushData, options)
                    .map(data => {
                      console.log('Successfully Sent');
                    });
 }

}

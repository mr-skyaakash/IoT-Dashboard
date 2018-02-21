import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor() {
  }

  receiveMessage() {
  }

}

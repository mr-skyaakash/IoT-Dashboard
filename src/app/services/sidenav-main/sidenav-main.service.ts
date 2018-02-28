import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidenavMainService {

  currentActive = new Subject<number>();

  constructor() { }

  selectIndex(nav: number) {
    this.currentActive.next(nav);
  }

}

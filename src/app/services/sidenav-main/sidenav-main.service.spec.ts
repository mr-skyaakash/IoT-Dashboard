import { TestBed, inject } from '@angular/core/testing';

import { SidenavMainService } from './sidenav-main.service';

describe('SidenavMainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavMainService]
    });
  });

  it('should be created', inject([SidenavMainService], (service: SidenavMainService) => {
    expect(service).toBeTruthy();
  }));
});

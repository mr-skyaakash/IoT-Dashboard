import { TestBed, inject } from '@angular/core/testing';

import { AddDeviceService } from './add-device.service';

describe('AddDeviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddDeviceService]
    });
  });

  it('should be created', inject([AddDeviceService], (service: AddDeviceService) => {
    expect(service).toBeTruthy();
  }));
});

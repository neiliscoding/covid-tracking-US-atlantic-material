/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AtlanticCovidTrackingService } from './atlantic-covid-tracking.service';

describe('Service: AtlanticCovidTracking', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtlanticCovidTrackingService]
    });
  });

  it('should ...', inject([AtlanticCovidTrackingService], (service: AtlanticCovidTrackingService) => {
    expect(service).toBeTruthy();
  }));
});

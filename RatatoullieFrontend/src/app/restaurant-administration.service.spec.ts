import { TestBed, inject } from '@angular/core/testing';

import { RestaurantAdministrationService } from './restaurant-administration.service';

describe('RestaurantAdministrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestaurantAdministrationService]
    });
  });

  it('should be created', inject([RestaurantAdministrationService], (service: RestaurantAdministrationService) => {
    expect(service).toBeTruthy();
  }));
});

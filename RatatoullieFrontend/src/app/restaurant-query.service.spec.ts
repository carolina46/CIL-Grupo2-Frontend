import { TestBed, inject } from '@angular/core/testing';

import { RestaurantQueryService } from './restaurant-query.service';

describe('RestaurantQueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestaurantQueryService]
    });
  });

  it('should be created', inject([RestaurantQueryService], (service: RestaurantQueryService) => {
    expect(service).toBeTruthy();
  }));
});

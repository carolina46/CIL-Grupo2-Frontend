import { TestBed, inject } from '@angular/core/testing';

import { RestaurantActionService } from './restaurant-action.service';

describe('RestaurantActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestaurantActionService]
    });
  });

  it('should be created', inject([RestaurantActionService], (service: RestaurantActionService) => {
    expect(service).toBeTruthy();
  }));
});

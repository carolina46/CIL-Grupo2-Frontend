import { TestBed, inject } from '@angular/core/testing';

import { ParentServiceService } from './parent-service.service';

describe('ParentServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParentServiceService]
    });
  });

  it('should be created', inject([ParentServiceService], (service: ParentServiceService) => {
    expect(service).toBeTruthy();
  }));
});

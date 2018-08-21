import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageServiceService } from './local-storage-service.service';

describe('LocalStorageServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageServiceService]
    });
  });

  it('should be created', inject([LocalStorageServiceService], (service: LocalStorageServiceService) => {
    expect(service).toBeTruthy();
  }));
});

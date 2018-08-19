import { TestBed, inject } from '@angular/core/testing';

import { MenuTypeService } from './menu-type.service';

describe('MenuTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuTypeService]
    });
  });

  it('should be created', inject([MenuTypeService], (service: MenuTypeService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { ChainsService } from './chains.service';

describe('ChainsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChainsService]
    });
  });

  it('should be created', inject([ChainsService], (service: ChainsService) => {
    expect(service).toBeTruthy();
  }));
});

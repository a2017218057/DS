import { TestBed, inject } from '@angular/core/testing';

import { EnterService } from './enter.service';

describe('EnterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterService]
    });
  });

  it('should be created', inject([EnterService], (service: EnterService) => {
    expect(service).toBeTruthy();
  }));
});

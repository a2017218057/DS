import { TestBed, inject } from '@angular/core/testing';

import { UploadpicService } from './uploadpic.service';

describe('UploadpicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadpicService]
    });
  });

  it('should be created', inject([UploadpicService], (service: UploadpicService) => {
    expect(service).toBeTruthy();
  }));
});

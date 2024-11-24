import { TestBed } from '@angular/core/testing';

import { NurseryService } from './nursery.service';

describe('NurseryService', () => {
  let service: NurseryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NurseryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

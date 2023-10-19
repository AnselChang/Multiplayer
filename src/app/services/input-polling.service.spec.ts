import { TestBed } from '@angular/core/testing';

import { InputPollingService } from './input-polling.service';

describe('InputPollingService', () => {
  let service: InputPollingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputPollingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

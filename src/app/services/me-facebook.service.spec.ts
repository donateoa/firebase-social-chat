import { TestBed } from '@angular/core/testing';

import { MeFacebookService } from './me-facebook.service';

describe('MeFacebookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeFacebookService = TestBed.get(MeFacebookService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MomentLocaleService } from './moment-locale.service';

describe('MomentLocaleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MomentLocaleService = TestBed.get(MomentLocaleService);
    expect(service).toBeTruthy();
  });
});

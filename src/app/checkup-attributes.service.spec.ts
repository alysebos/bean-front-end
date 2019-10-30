import { TestBed } from '@angular/core/testing';

import { CheckupAttributesService } from './checkup-attributes.service';

describe('CheckupAttributesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckupAttributesService = TestBed.get(CheckupAttributesService);
    expect(service).toBeTruthy();
  });
});

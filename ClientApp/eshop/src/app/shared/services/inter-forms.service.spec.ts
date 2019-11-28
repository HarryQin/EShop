import { TestBed } from '@angular/core/testing';

import { InterFormsService } from './inter-forms.service';

describe('InterFromsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterFormsService = TestBed.get(InterFormsService);
    expect(service).toBeTruthy();
  });
});

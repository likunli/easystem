/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScholarshipService } from './scholarship.service';

describe('ScholarshipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScholarshipService]
    });
  });

  it('should ...', inject([ScholarshipService], (service: ScholarshipService) => {
    expect(service).toBeTruthy();
  }));
});

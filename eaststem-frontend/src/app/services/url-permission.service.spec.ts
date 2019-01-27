/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UrlPermissionService } from './url-permission.service';

describe('UrlPermissionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlPermissionService]
    });
  });

  it('should ...', inject([UrlPermissionService], (service: UrlPermissionService) => {
    expect(service).toBeTruthy();
  }));
});

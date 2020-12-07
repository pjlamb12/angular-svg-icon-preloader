import { TestBed } from '@angular/core/testing';

import { AngularSvgIconPreloaderService } from './angular-svg-icon-preloader.service';

describe('AngularSvgIconPreloaderService', () => {
  let service: AngularSvgIconPreloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularSvgIconPreloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

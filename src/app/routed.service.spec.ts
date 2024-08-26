import { TestBed } from '@angular/core/testing';

import { RoutedService } from './routed.service';

describe('RoutedService', () => {
  let service: RoutedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

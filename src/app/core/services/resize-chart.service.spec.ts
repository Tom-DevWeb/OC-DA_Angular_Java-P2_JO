import { TestBed } from '@angular/core/testing';

import { ResizeChartService } from './resize-chart.service';

describe('ResizeChartService', () => {
  let service: ResizeChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResizeChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

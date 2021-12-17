import { TestBed } from '@angular/core/testing';

import { SubtareaService } from './subtarea.service';

describe('SubtareaService', () => {
  let service: SubtareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubtareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

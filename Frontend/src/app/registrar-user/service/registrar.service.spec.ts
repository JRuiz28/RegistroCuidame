import { TestBed } from '@angular/core/testing';

import { RegistrarService } from './registrar.service';

describe('ServiceService', () => {
  let service: RegistrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

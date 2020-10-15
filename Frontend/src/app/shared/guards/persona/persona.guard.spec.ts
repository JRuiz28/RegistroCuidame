import { TestBed } from '@angular/core/testing';

import { PersonaGuard } from './persona.guard';

describe('PersonaGuard', () => {
  let guard: PersonaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PersonaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

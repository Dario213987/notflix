import { TestBed } from '@angular/core/testing';

import { PeliculasDataService } from './peliculas-data.service';

describe('PeliculasDataService', () => {
  let service: PeliculasDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeliculasDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

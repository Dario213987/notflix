import { TestBed } from '@angular/core/testing';

import { FavoritosDataService } from './favoritos-data.service';

describe('FavoritosDataService', () => {
  let service: FavoritosDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritosDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

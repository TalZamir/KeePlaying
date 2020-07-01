import { TestBed } from '@angular/core/testing';

import { SongsApiService } from './songs-api.service';

describe('SongsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongsApiService = TestBed.get(SongsApiService);
    expect(service).toBeTruthy();
  });
});

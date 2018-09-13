import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './sharedService';

describe('SharedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SharedService]
    });
  });

  it('should be created', inject([SharedService], (service: SharedService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtService } from './jwt.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('JwtService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule]
  }));

  it('should be created', () => {
    const service: JwtService = TestBed.get(JwtService);
    expect(service).toBeTruthy();
  });
});

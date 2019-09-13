import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MsgService } from './msg.service';

describe('MsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: MsgService = TestBed.get(MsgService);
    expect(service).toBeTruthy();
  });
});

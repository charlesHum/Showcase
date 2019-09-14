import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MsgService } from './msg.service';
import Message from '../models/Message';


const mockMessages = [
  new Message(1, 'title', 'email', 'content', 'date'),
  new Message(2, 'title', 'email', 'content', 'date'),
  new Message(3, 'title', 'email', 'content', 'date')
];

describe('MsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: MsgService = TestBed.get(MsgService);
    expect(service).toBeTruthy();
  });

  it('should get messages', () => {
    const service: MsgService = TestBed.get(MsgService);
    const httpTestingController = TestBed.get(HttpTestingController);

    service.getMessages('token').subscribe( (messages: Message[]) => {
      expect(messages).toBe(mockMessages);
    }, err => console.log(err), () => console.log('DONE'));

    const req = httpTestingController.expectOne('http://localhost:4000/msg');
    req.flush(mockMessages);
  });

  it('should post messages', () => {
    const service: MsgService = TestBed.get(MsgService);
    const httpTestingController = TestBed.get(HttpTestingController);

    service.sendMessage('name', 'email', 'content').subscribe( (res) => {
      expect(res).toBe('all clear');
    }, err => console.log(err), () => console.log('DONE'));

    const req = httpTestingController.expectOne('http://localhost:4000/msg/add');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.name).toEqual('name');
    req.flush('all clear');
  });

  it('should delete messages', () => {
    const service: MsgService = TestBed.get(MsgService);
    const httpTestingController = TestBed.get(HttpTestingController);

    service.deletMsg('id', 'token').subscribe( (res) => {
      expect(res).toBe('all clear');
    }, err => console.log(err), () => console.log('DONE'));

    const req = httpTestingController.expectOne({ method: 'DELETE', url:'http://localhost:4000/msg/id' });
    expect(req.request.method).toBe('DELETE');
    req.flush('all clear');
  });

});

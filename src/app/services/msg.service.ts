import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  uri = 'http://localhost:4000/msg';

  constructor(private http: HttpClient) { }

  getMessages() {
    return this.http.get(this.uri);
  }

  sendMessage(name, email, content) {
    return this.http.post(this.uri + '/add', {name, email, content});
  }

}

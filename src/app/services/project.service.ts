import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  uri = 'http://localhost:4000/project';

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get(this.uri);
  }

  addProject(name, description, img) {
    return this.http.post(this.uri + '/add', {name, description, img});
  }

  deletProject(id: number) {
    return this.http.delete(this.uri + '/' + id);
  }

}

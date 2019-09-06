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

  addPic(img: FormData) {
    return this.http.post(this.uri + '/addPic', img);
  }

  addProject(name: string, description: string, filename: string) {
    console.log(filename);
    return this.http.post(this.uri + '/add', {name, description, filename});
  }

  deletProject(id: string) {
    return this.http.delete(this.uri + '/' + id);
  }

}

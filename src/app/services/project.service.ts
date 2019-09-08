import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Project from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  uri = 'http://localhost:4000/project';

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get(this.uri);
  }

  getProjectsAndPics() {
    const projectObservable = new Observable(observer => {
      this.getProjects().subscribe((res: Project[]) => {
        observer.next([1, res]);
        res.map(x => this.getImage(x.imgpath).subscribe( image => observer.next([2, image, x._id])
        ));
      });
    });
    return projectObservable;
  }

  getImage(imgpath: string) {
    return this.http.get(this.uri + '/getPic/' + imgpath, {responseType: 'blob'});
  }

  addPic(img: FormData, token: string) {
    return this.http.post(this.uri + '/addPic', img, {headers: { Authorization: `${token}` }});
  }

  addProject(name: string, description: string, filename: string, token: string) {
    console.log(filename);
    return this.http.post(this.uri + '/add', {name, description, filename}, {headers: { Authorization: `${token}` }});
  }

  deletProject(id: string, token: string) {
    return this.http.delete(this.uri + '/' + id, {headers: { Authorization: `${token}` }});
  }
}

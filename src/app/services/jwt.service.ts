import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import Auth from '../models/Auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  uri = 'http://localhost:4000/auth';
  loggedIn = false;
  token: string;

  constructor( private httpClient: HttpClient, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
      this.loggedIn = true;
      router.navigate(['/cm']);
    }
  }

  login(email: string, password: string) {
    return this.httpClient.post(this.uri + '/login', {email, password}).pipe(tap((res: Auth) => {
      console.log(res);
      this.token = res.token;
      this.loggedIn = res.auth;
      localStorage.setItem('token', JSON.stringify(res.token));
    }));
  }

  logout() {
    this.token = null;
    this.loggedIn = false;
    localStorage.removeItem('token');
  }

  setLoggedIn(loggedIn: boolean, token?: string) {
    this.loggedIn = loggedIn;
    this.token = token;
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken() {
    return JSON.parse(localStorage.getItem('token'));
  }
}

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JwtService } from './jwt.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CmComponent } from '../cm/cm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import Auth from '../models/Auth';

describe('JwtService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, MatTabsModule, BrowserAnimationsModule, MaterialFileInputModule, MatIconModule,
      MatSnackBarModule, MatFormFieldModule,
       FormsModule, ReactiveFormsModule, MatTableModule, RouterTestingModule.withRoutes([
      { path: 'cm', component: CmComponent}
  ])],
  declarations: [CmComponent]
  }));

  it('should be created', () => {
    const service: JwtService = TestBed.get(JwtService);
    expect(service).toBeTruthy();
  });

  it('should succesfully login', () => {
    const service: JwtService = TestBed.get(JwtService);
    const httpTestingController = TestBed.get(HttpTestingController);

    service.login('tester@a.test', '58#!4234#!#!#!sadas').subscribe( (auth: Auth) => {
      expect(service.getToken()).toBe('1');
      expect(service.loggedIn).toBe(true);
    }, err => console.log(err), () => console.log('DONE'));

    const req = httpTestingController.expectOne('http://localhost:4000/auth/login');
    const au = new Auth(true, '1');
    req.flush(au);
  });

  it('should succesfully login and logout', () => {
    const service: JwtService = TestBed.get(JwtService);

    const httpTestingController = TestBed.get(HttpTestingController);

    service.login('tester@a.test', '58#!4234#!#!#!sadas').subscribe( (auth: Auth) => {
      expect(service.getToken()).toBe('1');
      expect(service.loggedIn).toBe(true);
    }, err => console.log(err), () => console.log('DONE'));

    const req = httpTestingController.expectOne('http://localhost:4000/auth/login');
    const au = new Auth(true, '1');
    req.flush(au);

    expect(service.getToken()).toBe('1');
    expect(service.loggedIn).toBe(true);
    service.logout();
    expect(service.getToken()).toBe(null);
    expect(service.loggedIn).toBe(false);
  });

  it('should set and get the Token', () => {
    const service: JwtService = TestBed.get(JwtService);
    service.setLoggedIn(true, '1');
    expect(service.getToken()).toBe('1');
  });

});

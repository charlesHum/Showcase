import { Component, OnInit } from '@angular/core';
import { JwtService } from '../services/jwt.service';
import { Observable, timer } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logoClass = 'animated bounce';
  still = true;
  counter = new Observable<number>();
  constructor(private authService: JwtService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  isLogged(): boolean {
    return this.authService.loggedIn;
  }

  changeStyle($event) {
    if (this.still) {
      this.logoClass = $event.type === 'mouseover' ? 'animated bounce' : '';
      this.still = false;
      timer(600).subscribe(_ => {this.still = true; this.logoClass = ''; }) ;
    }
  }

}

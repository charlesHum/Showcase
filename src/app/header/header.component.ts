import { Component, OnInit } from '@angular/core';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: JwtService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  isLogged(): boolean {
    return this.authService.loggedIn;
  }

}

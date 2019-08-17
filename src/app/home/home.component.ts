import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tiles: Array<Tile> =  [
  {text: 'Front-end', color: '#F78888',
    iconBIG: '<i class="fas fa-6x fa-laptop-code"></i>', iconSMALL: '<i class="fas fa-4x fa-laptop-code"></i>', firstCap: 'Languages',
    secCap: 'Frameworks', firstCapContent: 'HTML, CSS, Sass, JavaScript - ECMAScript 6',
    secCapContent: 'Angular 7, Codepen, Bulma'},
  {text: 'Back-end', color: '#F3D250',
    iconBIG: '<i class="far fa-6x fa-file-code"></i>', iconSMALL: '<i class="far fa-4x fa-file-code"></i>', firstCap: 'Languages',
    secCap: 'Frameworks', firstCapContent: 'Java, Python, JavaScript - ECMAScript 6, Haskell, C#, C++, Groovy, Scala, Typescript',
    secCapContent: 'Express, Node.js, Spring, Spring Boot, Django, Electron, Mongoose, Hibernate'},
  {text: 'DB', color: '#90CCF4',
    iconBIG: '<i class="fas fa-6x fa-database"></i>', iconSMALL: '<i class="fas fa-4x fa-database"></i>',
    firstCap: 'Languages', secCap: 'Databases', firstCapContent: 'SQL, PL/SQL',
    secCapContent: 'MongoDB, Oracle DB, MySQL'},
  {text: 'DevOps', color: '#6DC66D',
    iconBIG: '<i class="fas fa-6x fa-server"></i>', iconSMALL: '<i class="fas fa-4x fa-server"></i>', firstCap: 'Technologies', secCap: '',
    firstCapContent: 'Gradle, GIT, Jenkins, Docker, Nagios, Selenium, SVN',
    secCapContent: ''}
  ];

  constructor() { }

  ngOnInit() {
  }

}

export class Tile {
  color: string;
  firstCap: string;
  firstCapContent: string;
  secCapContent: string;
  secCap: string;
  iconBIG: string;
  iconSMALL: string;
  text: string;
}

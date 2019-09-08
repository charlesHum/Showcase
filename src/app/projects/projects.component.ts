import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import Project from '../models/Project';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  mySrc;
  constructor(private projectService: ProjectService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.projectService.getProjectsAndPics().subscribe((res) => {
      if (res[0] === 1) {
        this.projects = res[1];
      }
      if (res[0] === 2) {
        const objectURL = URL.createObjectURL(res[1]);
        const sanitized = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.projects.map(x => x._id === res[2] ? x.image = sanitized : x.image);
      }
    });
  }
}

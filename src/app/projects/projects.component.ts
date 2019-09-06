import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import Project from '../models/Project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe((res: Project[]) => {
      console.log(res);
      this.projects = res;
    });
  }

}

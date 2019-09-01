import { Component, OnInit } from '@angular/core';
import { MsgService } from '../services/msg.service';
import Message from '../models/Message';
import Project from '../models/Project';
import { ProjectService } from '../services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cm',
  templateUrl: './cm.component.html',
  styleUrls: ['./cm.component.scss']
})
export class CmComponent implements OnInit {

  submitted = false;
  messageColumns: string[] = ['name', 'email', 'createdAt', 'content', 'delet'];
  projectColumns: string[] = ['name', 'description', 'imgpath', 'createdAt', 'delet'];
  messages: Message[] = [];
  msgDataSource = [];
  projects: Project[] = [];
  projectForm: FormGroup;
  projectDataSource = [];
  constructor(private msgService: MsgService, private projectService: ProjectService,
              private formBuilder: FormBuilder, private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.msgService.getMessages().subscribe((res: Message[]) => {
      console.log(res);
      this.messages = res;
      this.msgDataSource = this.messages;
    });

    this.projectService.getProjects().subscribe((res: Project[]) => {
      console.log(res);
      this.projects = res;
      this.projectDataSource = this.projects;
    });
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      desc: ['', [Validators.required]],
      imgpath: ['', Validators.required]
  });
  }

  getError(control: string, error: string) {
    return this.projectForm.controls[control].errors[error];
  }

  getErrors(control: string) {
    return this.projectForm.controls[control].errors;
  }

  onSubmit() {
    console.log('todo');
    if (!this.projectForm.errors && !this.projectForm.pristine) {
      this.projectService.addProject(this.projectForm.controls.name.value, this.projectForm.controls.desc.value,
        this.projectForm.controls.imgpath.value).subscribe( res => {
          console.log(res);
          this.projectForm.reset();
          this.submitted = false;
          this.matSnackBar.open(' Message succesfully sent ', 'OK', {duration: 2000});
          console.log(res);
        });
    }
  }

}

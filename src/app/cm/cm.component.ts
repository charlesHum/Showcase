import { Component, OnInit } from '@angular/core';
import { MsgService } from '../services/msg.service';
import Message from '../models/Message';
import Project from '../models/Project';
import { ProjectService } from '../services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileValidator } from 'ngx-material-file-input';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cm',
  templateUrl: './cm.component.html',
  styleUrls: ['./cm.component.scss']
})
export class CmComponent implements OnInit {

  submitted = false;
  readonly maxSize = 10485760;
  messageColumns: string[] = ['name', 'email', 'createdAt', 'content', 'delet'];
  projectColumns: string[] = ['name', 'description', 'imgpath', 'createdAt', 'delet'];
  messages: Message[] = [];
  msgDataSource = [];
  projects: Project[] = [];
  projectForm: FormGroup;
  projectDataSource = [];
  constructor(private msgService: MsgService, private projectService: ProjectService,
              private formBuilder: FormBuilder, private matSnackBar: MatSnackBar,
              private authService: JwtService, private router: Router) {
                if (!localStorage.getItem('token')) {
                  router.navigate(['/login']);
                }
               }

  ngOnInit() {
    this.msgService.getMessages(this.authService.getToken()).subscribe((res: Message[]) => {
      this.messages = res;
      this.msgDataSource = this.messages;
    });

    this.projectService.getProjects().subscribe((res: Project[]) => {
      this.projects = res;
      this.projectDataSource = this.projects;
    });
    this.projectForm = this.formBuilder.group({
      name: ['', Validators.required],
      desc: ['', [Validators.required]],
      requiredfile: [
        undefined,
        [Validators.required, FileValidator.maxContentSize(this.maxSize)]
      ]
  });
  }

  getError(control: string, error: string) {
    return this.projectForm.controls[control].errors[error];
  }

  getErrors(control: string) {
    return this.projectForm.controls[control].errors;
  }

  deletProject(project: Project) {
    this.projectService.deletProject(project._id, this.authService.getToken()).subscribe(res => {
      if (res) {
        this.matSnackBar.open(' Project removed succesfully ', 'OK', {duration: 2000});
        this.projectDataSource = this.projectDataSource.filter( (x: Project) => x._id !== project._id);
      }
    });
  }

  deletMessage(message: Message) {
    this.msgService.deletMsg(message._id, this.authService.getToken()).subscribe(res => {
      if (res) {
        this.matSnackBar.open(' Message removed succesfully ', 'OK', {duration: 2000});
        this.msgDataSource = this.msgDataSource.filter( (x: Message) => x._id !== message._id);
      }
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('image', this.projectForm.controls.requiredfile.value._files[0]);
    if (!this.projectForm.errors && !this.projectForm.pristine) {
      this.projectService.addPic(formData, this.authService.getToken()).subscribe((res: string) => {
        if (res) {
          this.projectService.addProject(this.projectForm.controls.name.value, this.projectForm.controls.desc.value,
            res, this.authService.getToken()).subscribe( project => {
              this.projectForm.reset();
              this.submitted = false;
              this.matSnackBar.open(' Project succesfully saved ', 'OK', {duration: 2000});
              this.projectDataSource = this.projectDataSource.concat(project);
            });
        }
      });
    }
  }
}

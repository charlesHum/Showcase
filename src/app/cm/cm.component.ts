import { Component, OnInit } from '@angular/core';
import { MsgService } from '../services/msg.service';
import Message from '../models/Message';
import Project from '../models/Project';
import { ProjectService } from '../services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileValidator } from 'ngx-material-file-input';
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

  delet(project: Project) {
    console.log(project);
    this.projectService.deletProject(project._id).subscribe(res => {
      if (res) {
        this.matSnackBar.open(' Project removed succesfully ', 'OK', {duration: 2000});
        this.projectDataSource = this.projectDataSource.filter( (x: Project) => x._id !== project._id);
      }
    });
    // if succ remove from visibility
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('image', this.projectForm.controls.requiredfile.value._files[0]);
    if (!this.projectForm.errors && !this.projectForm.pristine) {
      this.projectService.addPic(formData).subscribe((res: string) => {
        if (res) {
          this.projectService.addProject(this.projectForm.controls.name.value, this.projectForm.controls.desc.value,
            res).subscribe( project => {
              console.log(project);
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MsgService } from '../services/msg.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private msgService: MsgService, private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', [Validators.required, Validators.email]],
      issue: ['', Validators.required]
  });
  }

  getError(control: string, error: string) {
    return this.contactForm.controls[control].errors[error];
  }

  getErrors(control: string) {
    return this.contactForm.controls[control].errors;
  }


  onSubmit() {
    console.log(this.contactForm)
    if (this.contactForm.controls.issue.value && this.contactForm.controls.issue.value.length >= 5000) {
      this.contactForm.controls.issue.setErrors({long: true});
    } else if (!this.contactForm.errors && !this.contactForm.pristine) {
      this.submitted = true;
      this.msgService.sendMessage(this.contactForm.controls.name.value,
         this.contactForm.controls.address.value, this.contactForm.controls.issue.value).subscribe(res => {
          this.contactForm.reset();
          this.submitted = false;
          this.matSnackBar.open(' Message succesfully sent ', 'OK', {duration: 2000});
          console.log(res);
         }, err => {
           console.log(err);
           this.matSnackBar.open(' Something went wrong ', 'OK', {duration: 2000});
           this.submitted = false;
         });
    }
  }

}

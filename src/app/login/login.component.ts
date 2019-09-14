import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private jwtServie: JwtService, private router: Router, private matSnackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  getError(control: string, error: string) {
    return this.loginForm.controls[control].errors[error];
  }

  getErrors(control: string) {
    return this.loginForm.controls[control].errors;
  }

  login() {
    this.submitted = true;
    const val = this.loginForm.value;

    if (val.email && val.password) {
        this.jwtServie.login(val.email, val.password)
            .subscribe(
                () => {
                    this.submitted = false;
                    this.router.navigateByUrl('/cm');
                }
            ,
            err => {
              console.log(err);
              this.matSnackBar.open(' Credentials dont check out ', 'OK', {duration: 2000});
              this.submitted = false;
            }
            );
    } else {this.submitted = false; }
}

}

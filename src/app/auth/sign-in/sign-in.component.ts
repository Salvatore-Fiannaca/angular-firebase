import { Component, OnInit } from '@angular/core';
import { AuthService } from "./../../auth/auth.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    public AuthService: AuthService,
    public router: Router
    ) { }

  loginForm = new FormGroup({
    email : new FormControl('', [
      Validators.required, 
      Validators.email,
    ]),
    password : new FormControl('', [
      Validators.required, 
      Validators.minLength(4),
      Validators.pattern("[A-Za-z0-9- è]*"),
      Validators.maxLength(20)
    ]),
  });

  get form() {
    return this.loginForm;
  }

  submit(){
    this.AuthService.SignIn(this.form.value.email, this.form.value.password)
  }

  ngOnInit(){
    if ( this.AuthService.isLoggedIn ){
      this.router.navigate(['dashboard']);
    }
  }

}



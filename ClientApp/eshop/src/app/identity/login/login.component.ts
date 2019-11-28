import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordVisible: boolean;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    this.authService
      .login(
        this.form.value.email,
        this.form.value.password
      );
  }

}

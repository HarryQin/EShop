import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import {
  AuthenticationService
} from '../authentication.service';
import {
  TranslateService
} from '@ngx-translate/core';
import {
  first
} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordVisible: boolean;
  form: FormGroup;
  returnUrl: string;
  error = ' ';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.authService
      .login(
        this.form.value.email,
        this.form.value.password
      ).pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
        });
  }

}

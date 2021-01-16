import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api/api.service';
import { LoginLogoutService } from 'src/app/shared/auth/login-logout.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public errorMessages = {
    username: [
      { type: 'required', message: 'Username is required' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
    ]
  };

  constructor(
    private readonly apiService: ApiService,
    private snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly loginLogoutService: LoginLogoutService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('',Validators.compose([
        Validators.required
      ])),
    });
  }

  public login(): void {
    if (this.loginForm.get('username').value === 'test' && this.loginForm.get('password').value === 'test') {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('username', this.loginForm.get('username').value);
      localStorage.setItem('role', 'ADMIN');
      this.loginLogoutService.loginUser(true);
    } else {
      this.snackBar.open('Incorrect username or password', '', {
        duration: 2000,
        panelClass: ['error-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

}

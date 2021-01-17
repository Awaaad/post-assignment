import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api/api.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  public errorMessages = {
    title: [
      { type: 'required', message: 'Title is required' },
    ],
    body: [
      { type: 'maxlength', message: 'Body must be less than 400 characters' },
    ]
  };

  constructor(
    private readonly apiService: ApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initialiseForm();
  }

  private initialiseForm(): void {
    this.profileForm = new FormGroup({
      title: new FormControl('', Validators.compose([
        Validators.required
      ])),
      body: new FormControl('',Validators.compose([
        Validators.maxLength(400)
      ])),
    });
  }

  public savePost(): void {
    this.apiService.savePost(this.profileForm.value).subscribe(
      data => {
        this.snackBar.open('Post saved sucessfully','', {
          duration: 2000,
          panelClass: ['success-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        this.profileForm.reset();
      },
      ((response: HttpResponse<any>) => {
        if (response.status !== 200) {
          this.snackBar.open('Server Error (Server not responding correctly)', '', {
            duration: 2000,
            panelClass: ['error-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        } 
      })
    )
  }
}

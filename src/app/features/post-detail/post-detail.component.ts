import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api/api.service';
import { PostModel } from 'src/app/shared/model/model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  public profileForm: FormGroup;
  private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  public id: any = this.activatedRoute.snapshot.paramMap.get('id');
  public post: PostModel;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiService: ApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPostsById();
    this.initialiseForm();
  }

  private initialiseForm(): void {
    this.profileForm = new FormGroup({
      userId: new FormControl({value: '', disabled: true}),
      id: new FormControl({value: '', disabled: true}),
      title: new FormControl({value: '', disabled: true}),
      body: new FormControl({value: '', disabled: true}),
    });
  }

  private getPostsById(): void {
    this.apiService.getPostById(this.id).subscribe(data => {
      this.post = data;
    },
    err => {
      this.snackBar.open('Server Error (Server not responding correctly)', '', {
        duration: 2000,
        panelClass: ['error-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public id: any = this.activatedRoute.snapshot.paramMap.get('id');
  public post: PostModel;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getPostById(this.id).subscribe(data => {
      this.post = data;
    })

    this.profileForm = new FormGroup({
      userId: new FormControl({value: '', disabled: true}),
      id: new FormControl({value: '', disabled: true}),
      title: new FormControl({value: '', disabled: true}),
      body: new FormControl({value: '', disabled: true}),
    });
  }

}
